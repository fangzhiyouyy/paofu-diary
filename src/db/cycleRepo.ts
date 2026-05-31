import { supabase } from './supabase'
import type { CycleRecord, PhaseRange } from '../types'

export async function getCurrentCycle(): Promise<CycleRecord | null> {
  const { data } = await supabase
    .from('cycles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
  return data as CycleRecord | null
}

export async function getCycles(limit = 12): Promise<CycleRecord[]> {
  const { data } = await supabase
    .from('cycles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  return (data || []) as CycleRecord[]
}

export async function upsertCycle(cycle: Omit<CycleRecord, 'id'> & { id?: string }): Promise<CycleRecord> {
  const { data } = await supabase
    .from('cycles')
    .upsert(cycle)
    .select()
    .single()
  return data as CycleRecord
}

// 根据历史周期数据计算平均周期长度和经期长度
export function calcHistoryAvg(cycles: CycleRecord[]): { avgCycleLength: number; avgPeriodDuration: number } {
  if (cycles.length === 0) return { avgCycleLength: 30, avgPeriodDuration: 5 }
  let totalCycle = 0, totalPeriod = 0, count = 0
  for (const c of cycles) {
    if (!c.phases || c.phases.length === 0) continue
    const menstrual = c.phases.find(p => p.phase === 'menstrual')
    if (!menstrual) continue
    const first = c.phases[0].start
    const last = c.phases[c.phases.length - 1].end
    totalCycle += (new Date(last).getTime() - new Date(first).getTime()) / 86400000
    totalPeriod += (new Date(menstrual.end).getTime() - new Date(menstrual.start).getTime()) / 86400000 + 1
    count++
  }
  return {
    avgCycleLength: count > 0 ? Math.round(totalCycle / count) : 28,
    avgPeriodDuration: count > 0 ? Math.round(totalPeriod / count) : 5,
  }
}

// 生成默认四阶段（基于经期首日和平均数据）
export function generateDefaultPhases(periodStart: string, periodDays: number, cycleDays: number): PhaseRange[] {
  const start = new Date(periodStart)
  const addDays = (d: Date, n: number) => { const r = new Date(d); r.setDate(r.getDate() + n); return r }
  const fmt = (d: Date) => d.toISOString().split('T')[0]

  const menstrualEnd = addDays(start, periodDays - 1)
  const follicularEnd = addDays(start, periodDays + Math.round((cycleDays - periodDays) * 0.37) - 1)
  const ovulationEnd = addDays(follicularEnd, Math.round((cycleDays - periodDays) * 0.16))
  const lutealEnd = addDays(start, cycleDays - 2)

  return [
    { phase: 'menstrual',  start: fmt(start), end: fmt(menstrualEnd) },
    { phase: 'follicular', start: fmt(addDays(menstrualEnd, 1)), end: fmt(follicularEnd) },
    { phase: 'ovulation',  start: fmt(addDays(follicularEnd, 1)), end: fmt(ovulationEnd) },
    { phase: 'luteal',     start: fmt(addDays(ovulationEnd, 1)), end: fmt(lutealEnd) },
  ]
}
