// ====== 维度类型 ======
export interface Dimensions {
  mood: number        // 心情 0-100
  satiety: number     // 饱腹 0-100
  sleep_quality: number // 睡眠 0-100
  energy: number      // 精力 0-100
  happiness: number   // 幸福 0-100
  stress: number      // 压力 0-100（越低越好）
  health: number      // 健康 0-100
}

export const DEFAULT_DIMENSIONS: Dimensions = {
  mood: 60, satiety: 60, sleep_quality: 70,
  energy: 65, happiness: 65, stress: 40, health: 75,
}

// ====== 周期阶段 ======
export type CyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal'

export const PHASE_META: Record<CyclePhase, {
  label: string; emoji: string; color: string; bgColor: string
}> = {
  menstrual:  { label: '经期',   emoji: '🌹', color: '#E8576B', bgColor: '#FCE4EC' },
  follicular: { label: '卵泡期', emoji: '🌱', color: '#7BC67E', bgColor: '#E8F5E9' },
  ovulation:  { label: '排卵期', emoji: '🌸', color: '#F4A7B9', bgColor: '#FDE4EC' },
  luteal:     { label: '黄体期', emoji: '🍂', color: '#E8A87C', bgColor: '#FFF3E0' },
}

export interface PhaseRange {
  phase: CyclePhase
  start: string  // 'YYYY-MM-DD'
  end: string    // 'YYYY-MM-DD'
}

// ====== 行为类型 ======
export type BehaviorType =
  | 'sleep' | 'meal' | 'work' | 'shopping'
  | 'exercise' | 'social' | 'relax' | 'grooming'

export const BEHAVIOR_META: Record<BehaviorType, { label: string; emoji: string }> = {
  sleep:    { label: '睡眠', emoji: '😴' },
  meal:     { label: '饮食', emoji: '🍜' },
  work:     { label: '工作', emoji: '💼' },
  shopping: { label: '购物', emoji: '🛍️' },
  exercise: { label: '运动', emoji: '🏃' },
  social:   { label: '社交', emoji: '👥' },
  relax:    { label: '放松', emoji: '🧘' },
  grooming: { label: '打扮', emoji: '💄' },
}

export interface BehaviorEffect {
  dimension: keyof Dimensions
  delta: number
}

export interface Behavior {
  id: string
  date: string          // 'YYYY-MM-DD'
  type: BehaviorType
  subtype: string
  time: string           // 'HH:mm'
  detail: Record<string, unknown>
  effects: Partial<Dimensions>
  note?: string
}

// ====== 日记录 ======
export type PandaMood = 'happy' | 'energetic' | 'neutral' | 'sleepy' | 'sad' | 'stressed'

export interface MenstruationLog {
  is_period_day: boolean
  flow_level: number | null  // 1-5
  symptoms: string[]
  note: string | null
}

export interface DailyRecord {
  date: string
  cycle_phase: CyclePhase | null
  day_of_cycle: number | null
  morning_dimensions: Dimensions
  current_dimensions: Dimensions
  panda_mood: PandaMood
  panda_quote: string
  outfit_color: string | null
  outfit_name: string | null
  menstruation_log: MenstruationLog | null
}

// ====== 周期记录 ======
export interface CycleRecord {
  id: string
  created_at: string
  phases: PhaseRange[]
  history_avg_cycle_length: number
  history_avg_period_duration: number
}

// ====== 色彩预设 ======
export interface OutfitColor {
  name: string
  hex: string
  emoji: string
}

export const OUTFIT_COLORS: OutfitColor[] = [
  { name: '黑色', hex: '#2D2D2D', emoji: '🖤' },
  { name: '白色', hex: '#F5F5F5', emoji: '🤍' },
  { name: '灰色', hex: '#9E9E9E', emoji: '🩶' },
  { name: '米色', hex: '#E8D5B7', emoji: '🧶' },
  { name: '红色', hex: '#E53935', emoji: '❤️' },
  { name: '橙色', hex: '#FB8C00', emoji: '🧡' },
  { name: '黄色', hex: '#FDD835', emoji: '💛' },
  { name: '绿色', hex: '#43A047', emoji: '💚' },
  { name: '蓝色', hex: '#1E88E5', emoji: '💙' },
  { name: '青色', hex: '#00ACC1', emoji: '🩵' },
  { name: '粉色', hex: '#EC407A', emoji: '🩷' },
  { name: '紫色', hex: '#8E24AA', emoji: '💜' },
  { name: '桃红', hex: '#F06292', emoji: '🌸' },
  { name: '棕色', hex: '#6D4C41', emoji: '🤎' },
  { name: '卡其', hex: '#A0896C', emoji: '🏾' },
  { name: '牛仔蓝', hex: '#546E7A', emoji: '👖' },
]
