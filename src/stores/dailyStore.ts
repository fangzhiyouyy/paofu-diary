import { create } from 'zustand'
import type { DailyRecord, Dimensions, Behavior } from '../types'
import { DEFAULT_DIMENSIONS } from '../types'
import { getDailyRecord, upsertDailyRecord } from '../db/dailyRepo'
import { getBehaviors, addBehavior as dbAddBehavior, deleteBehavior as dbDelBehavior } from '../db/behaviorRepo'
import { applyEffects, calcPandaMood, calcBehaviorEffects } from '../engine/dimensionCalc'

interface DailyState {
  // 当前日记录
  record: DailyRecord | null
  behaviors: Behavior[]
  loading: boolean

  // 动作
  loadToday: (date?: string) => Promise<void>
  addBehavior: (b: Omit<Behavior, 'id' | 'date' | 'effects'>) => Promise<void>
  removeBehavior: (id: string) => Promise<void>
  updateDimensions: (dims: Partial<Dimensions>) => void
  setOutfitColor: (hex: string, name: string) => Promise<void>
  setMenstruationLog: (log: DailyRecord['menstruation_log']) => Promise<void>
  initRecord: (record: DailyRecord) => void
}

export const useDailyStore = create<DailyState>((set, get) => ({
  record: null,
  behaviors: [],
  loading: false,

  loadToday: async (date) => {
    set({ loading: true })
    const today = date || new Date().toISOString().split('T')[0]
    const record = await getDailyRecord(today)
    const behaviors = await getBehaviors(today)
    set({ record, behaviors, loading: false })
  },

  initRecord: (record) => {
    set({ record })
  },

  addBehavior: async (b) => {
    const { record, behaviors } = get()
    const today = record?.date || new Date().toISOString().split('T')[0]
    const effects = calcBehaviorEffects(b)

    const newBehavior: Behavior = {
      ...b,
      id: crypto.randomUUID(),
      date: today,
      effects,
    }

    await dbAddBehavior(newBehavior)
    const newBehaviors = [...behaviors, newBehavior]

    const currentDims = record?.current_dimensions || { ...DEFAULT_DIMENSIONS }
    const newDims = applyEffects(currentDims, effects)
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
    set({ record: updatedRecord, behaviors: newBehaviors })
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
