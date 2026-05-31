import type { Dimensions, DailyRecord, Behavior } from '../types'
import { DEFAULT_DIMENSIONS } from '../types'
import { calcPandaMood } from './dimensionCalc'
import { generateQuote } from './quoteGenerator'

/**
 * 清晨刷新引擎：根据昨日行为+睡眠数据，生成今日初始七维
 */
export function morningRefresh(
  yesterdayRecord: DailyRecord | null,
  yesterdayBehaviors: Behavior[],
  cyclePhase: DailyRecord['cycle_phase'],
  outfitColor: string | null,
): Pick<DailyRecord, 'morning_dimensions' | 'current_dimensions' | 'panda_mood' | 'panda_quote'> {
  const prev = yesterdayRecord?.current_dimensions || DEFAULT_DIMENSIONS

  // 提取昨日睡眠行为
  const sleepBehaviors = yesterdayBehaviors.filter(b => b.type === 'sleep')
  const sleepEffect = sleepBehaviors.reduce(
    (acc, b) => {
      if (b.effects) {
        for (const [k, v] of Object.entries(b.effects)) {
          acc[k as keyof Dimensions] = (acc[k as keyof Dimensions] || 0) + (v as number)
        }
      }
      return acc
    },
    {} as Partial<Dimensions>,
  )

  // 初始化今日维度
  const morning: Dimensions = {
    mood: clamp(Math.round(prev.happiness * 0.4 + (sleepEffect.sleep_quality || 70) * 0.3 + rand(-5, 10))),
    satiety: 60, // 清晨微饿
    sleep_quality: clamp(Math.round(sleepEffect.sleep_quality || prev.sleep_quality * 0.7)),
    energy: clamp(Math.round((sleepEffect.energy || prev.energy * 0.6) + prev.health * 0.15)),
    happiness: clamp(Math.round(prev.mood * 0.5 + prev.happiness * 0.3 + rand(-3, 8))),
    stress: clamp(Math.round(prev.stress * 0.4 + rand(-5, 10))),
    health: clamp(Math.round(prev.health * 0.85 + rand(-3, 5))),
  }

  const pandaMood = calcPandaMood(morning)
  const pandaQuote = generateQuote(morning.mood, cyclePhase, outfitColor)

  return {
    morning_dimensions: morning,
    current_dimensions: { ...morning },
    panda_mood: pandaMood,
    panda_quote: pandaQuote,
  }
}

function clamp(v: number): number {
  return Math.max(0, Math.min(100, v))
}

function rand(min: number, max: number): number {
  // 确定性随机：基于日期的伪随机
  const today = new Date().toISOString().split('T')[0]
  const hash = today.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const r = ((hash * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff
  return min + r * (max - min)
}
