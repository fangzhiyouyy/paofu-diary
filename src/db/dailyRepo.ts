import { supabase } from './supabase'
import type { DailyRecord } from '../types'
import { getToday } from '../engine/phaseDetector'

export async function getDailyRecord(date?: string): Promise<DailyRecord | null> {
  const target = date || getToday()
  const { data } = await supabase
    .from('daily_records')
    .select('*')
    .eq('date', target)
    .single()
  return data as DailyRecord | null
}

export async function upsertDailyRecord(record: DailyRecord): Promise<void> {
  await supabase.from('daily_records').upsert(record, { onConflict: 'date' })
}

export async function getMonthRecords(year: number, month: number): Promise<DailyRecord[]> {
  const start = `${year}-${String(month).padStart(2, '0')}-01`
  const end = `${year}-${String(month).padStart(2, '0')}-31`
  const { data } = await supabase
    .from('daily_records')
    .select('*')
    .gte('date', start)
    .lte('date', end)
    .order('date', { ascending: true })
  return (data || []) as DailyRecord[]
}
