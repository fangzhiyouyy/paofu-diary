import { supabase } from './supabase'
import type { Behavior } from '../types'

export async function getBehaviors(date: string): Promise<Behavior[]> {
  const { data } = await supabase
    .from('behaviors')
    .select('*')
    .eq('date', date)
    .order('time', { ascending: true })
  return (data || []) as Behavior[]
}

export async function addBehavior(b: Omit<Behavior, 'id'>): Promise<Behavior> {
  const { data } = await supabase
    .from('behaviors')
    .insert(b)
    .select()
    .single()
  return data as Behavior
}

export async function deleteBehavior(id: string): Promise<void> {
  await supabase.from('behaviors').delete().eq('id', id)
}
