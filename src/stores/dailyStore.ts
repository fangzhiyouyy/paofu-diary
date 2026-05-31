import { create } from 'zustand'
import type { DailyRecord, Dimensions, Behavior, CyclePhase } from '../types'
import { DEFAULT_DIMENSIONS } from '../types'
import { getDailyRecord, upsertDailyRecord } from '../db/dailyRepo'
import { getBehaviors, addBehavior as dbAddBehavior, deleteBehavior as dbDelBehavior } from '../db/behaviorRepo'
import { applyEffects, calcPandaMood, calcBehaviorEffects } from '../engine/dimensionCalc'
import { morningRefresh } from '../engine/refreshEngine'
import { getCurrentCycle } from '../db/cycleRepo'
import { detectPhase, getToday } from '../engine/phaseDetector'

interface DailyState {
  record: DailyRecord | null
  behaviors: Behavior[]
  loading: boolean

  loadToday: (date?: string) => Promise<void>
  addBehavior: (b: Omit<Behavior, 'id' | 'date' | 'effects'> & { date?: string }) => Promise<void>
  removeBehavior: (id: string) => Promise<void>
  updateDimensions: (dims: Partial<Dimensions>) => void
  setOutfitColor: (hex: string, name: string) => Promise<void>
  setMenstruationLog: (log: DailyRecord['menstruation_log']) => Promise<void>
  initRecord: (record: DailyRecord) => void
  refreshToday: (date: string) => Promise<DailyRecord>
}

export const useDailyStore = create<DailyState>((set, get) => ({
  record: null,
  behaviors: [],
  loading: false,

  loadToday: async (date) => {
    set({ loading: true })
    try {
      const today = date || getToday()
      console.log('🔍 loadToday:', today)
      let record = await getDailyRecord(today)
      if (!record && today === getToday()) {
        console.log('🌅 今天还没记录，执行晨间刷新...')
        record = await get().refreshToday(today)
      }
      console.log('📋 record:', record?.date || 'null')
      const behaviors = await getBehaviors(today)
      console.log('📋 behaviors:', behaviors.length)
      set({ record, behaviors, loading: false })
    } catch (err) {
      console.error('❌ loadToday failed:', err)
      set({ loading: false })
    }
  },

  refreshToday: async (today) => {
    const yd = new Date(today + 'T12:00:00')
    yd.setDate(yd.getDate() - 1)
    const yesterday = yd.toISOString().split('T')[0]
    const [yesterdayRecord, yesterdayBehaviors, cycle] = await Promise.all([
      getDailyRecord(yesterday),
      getBehaviors(yesterday),
      getCurrentCycle(),
    ])
    let cyclePhase: CyclePhase | null = null
    if (cycle?.phases) {
      cyclePhase = detectPhase(today, cycle.phases).phase
    }
    const outfitColor = yesterdayRecord?.outfit_color || null
    const fresh = morningRefresh(yesterdayRecord, yesterdayBehaviors, cyclePhase, outfitColor)
    const record: DailyRecord = {
      date: today,
      cycle_phase: cyclePhase,
      day_of_cycle: null,
      ...fresh,
      outfit_color: outfitColor,
      outfit_name: yesterdayRecord?.outfit_name || null,
      menstruation_log: null,
    }
    await upsertDailyRecord(record)
    console.log('✅ 晨间刷新完成:', record.morning_dimensions)
    return record
  },

  initRecord: (record) => {
    set({ record })
  },

  addBehavior: async (b) => {
    try {
      const { record, behaviors } = get()
      const today = b.date || record?.date || new Date().toISOString().split('T')[0]
      const effects = calcBehaviorEffects(b)
      console.log('🧮 effects:', effects)

      const newBehavior: Behavior = {
        ...b,
        id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : 'id-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9),
        date: today,
        effects,
      }
      console.log('📤 inserting behavior:', newBehavior)

      await dbAddBehavior(newBehavior)
      console.log('✅ behavior saved')

      const newBehaviors = [...behaviors, newBehavior]
      const currentDims = record?.current_dimensions || { ...DEFAULT_DIMENSIONS }
      const newDims = applyEffects(currentDims, effects)
      console.log('📊 new dimensions:', newDims)

      const pandaMood = calcPandaMood(newDims)

      const updatedRecord: DailyRecord = {
        date: today,
        cycle_phase: record?.cycle_phase || null,
        day_of_cycle: record?.day_of_cycle || null,
        morning_dimensions: record?.morning_dimensions || { ...DEFAULT_DIMENSIONS },
        current_dimensions: newDims,
        panda_mood: pandaMood,
        panda_quote: record?.panda_quote || '',
        outfit_color: record?.outfit_color || null,
        outfit_name: record?.outfit_name || null,
        menstruation_log: record?.menstruation_log || null,
      }

      await upsertDailyRecord(updatedRecord)
      console.log('✅ daily record upserted')
      set({ record: updatedRecord, behaviors: newBehaviors })
    } catch (err) {
      console.error('❌ addBehavior failed:', err)
      alert('添加失败！请检查 Supabase 连接。\n\n' + String(err))
    }
  },

  removeBehavior: async (id) => {
    // 简化处理：删除后重新加载
    await dbDelBehavior(id)
    const { record } = get()
    if (record) {
      const behaviors = await getBehaviors(record.date)
      // 重新计算维度
      let dims = { ...record.morning_dimensions }
      for (const b of behaviors) {
        dims = applyEffects(dims, b.effects || {})
      }
      const updatedRecord = {
        ...record,
        current_dimensions: dims,
        panda_mood: calcPandaMood(dims),
      }
      await upsertDailyRecord(updatedRecord)
      set({ record: updatedRecord, behaviors })
    }
  },

  updateDimensions: (dims) => {
    const { record } = get()
    if (!record) return
    const newDims = { ...record.current_dimensions, ...dims }
    set({ record: { ...record, current_dimensions: newDims, panda_mood: calcPandaMood(newDims) } })
  },

  setOutfitColor: async (hex, name) => {
    const { record } = get()
    if (!record) return
    const updated = { ...record, outfit_color: hex, outfit_name: name }
    await upsertDailyRecord(updated)
    set({ record: updated })
  },

  setMenstruationLog: async (log) => {
    const { record } = get()
    if (!record) return
    const updated = { ...record, menstruation_log: log }
    await upsertDailyRecord(updated)
    set({ record: updated })
  },
}))
