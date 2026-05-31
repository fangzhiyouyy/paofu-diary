import type { Dimensions, Behavior } from '../types'

/**
 * 计算单个行为对七维的影响
 * 每个行为返回一个 Partial<Dimensions>（只包含受影响的维度）
 */
export function calcBehaviorEffects(behavior: Omit<Behavior, 'id' | 'date' | 'effects'>): Partial<Dimensions> {
  const { type, subtype } = behavior
  const e: Partial<Dimensions> = {}

  switch (type) {
    // ====== 饮食 ======
    case 'meal':
      switch (subtype) {
        case 'breakfast': Object.assign(e, { satiety: 25, mood: 10, energy: 15, health: 5 }); break
        case 'lunch':     Object.assign(e, { satiety: 30, mood: 10, energy: 10, health: 5 }); break
        case 'dinner':    Object.assign(e, { satiety: 30, mood: 15, energy: 5 }); break
        case 'dessert':   Object.assign(e, { satiety: 10, mood: 20, energy: 5, health: -3 }); break
        case 'snack':     Object.assign(e, { satiety: 8, mood: 8, energy: 3, health: -2 }); break
        case 'feast':     Object.assign(e, { satiety: 40, mood: 30, energy: -10, stress: 5 }); break
        case 'diet':      Object.assign(e, { satiety: 10, mood: -15, energy: -10, health: -5, stress: 10 }); break
      }
      break

    // ====== 睡眠 ======
    case 'sleep':
      switch (subtype) {
        case 'early':      Object.assign(e, { sleep_quality: 40, energy: 35, mood: 15, health: 10 }); break
        case 'normal':     Object.assign(e, { sleep_quality: 35, energy: 30, mood: 10, health: 8 }); break
        case 'late':       Object.assign(e, { sleep_quality: 15, energy: 10, mood: -10, health: -10 }); break
        case 'allnighter': Object.assign(e, { sleep_quality: 0, energy: -20, mood: -25, health: -20 }); break
        case 'nap_short':  Object.assign(e, { energy: 15, mood: 5, health: 3 }); break
        case 'nap_long':   Object.assign(e, { energy: -10, mood: -5 }); break
      }
      break

    // ====== 工作 ======
    case 'work':
      switch (subtype) {
        case 'flow':       Object.assign(e, { stress: -5, energy: -15, mood: 15, happiness: 10 }); break
        case 'normal':     Object.assign(e, { stress: 10, energy: -15 }); break
        case 'overtime':   Object.assign(e, { stress: 25, energy: -25, mood: -15, happiness: -10 }); break
        case 'meeting':    Object.assign(e, { stress: 10, energy: -10, mood: -5 }); break
        case 'done':       Object.assign(e, { stress: -10, energy: -5, mood: 20, happiness: 15 }); break
        case 'frustrated': Object.assign(e, { stress: 20, energy: -15, mood: -20, happiness: -15 }); break
      }
      break

    // ====== 购物 ======
    case 'shopping':
      switch (subtype) {
        case 'wishlist':   Object.assign(e, { mood: 30, happiness: 25, energy: 5, stress: -10 }); break
        case 'daily':      Object.assign(e, { mood: 10, happiness: 10, energy: -5 }); break
        case 'impulse':    Object.assign(e, { mood: 20, happiness: 5, energy: -5, stress: 10 }); break
      }
      break

    // ====== 运动 ======
    case 'exercise':
      switch (subtype) {
        case 'do':         Object.assign(e, { mood: 25, satiety: 5, sleep_quality: 15, energy: 10, happiness: 30, stress: -30, health: 15 }); break
        case 'cardio':     Object.assign(e, { health: 15, energy: -20, mood: 15, stress: -20 }); break
        case 'yoga':       Object.assign(e, { health: 10, energy: -5, mood: 10, stress: -25 }); break
        case 'walk':       Object.assign(e, { health: 8, energy: 5, mood: 12, stress: -15 }); break
        case 'gym':        Object.assign(e, { health: 18, energy: -25, mood: 10, stress: -15 }); break
      }
      break

    // ====== 社交 ======
    case 'social':
      switch (subtype) {
        case 'bestie':     Object.assign(e, { mood: 25, happiness: 30, energy: -15, stress: -20 }); break
        case 'date':       Object.assign(e, { mood: 30, happiness: 35, energy: -10, stress: -10 }); break
        case 'call':       Object.assign(e, { mood: 15, happiness: 10, stress: -5 }); break
        case 'social_duty':Object.assign(e, { mood: -5, happiness: -5, energy: -15, stress: 15 }); break
      }
      break

    // ====== 放松 ======
    case 'relax':
      switch (subtype) {
        case 'bath':       Object.assign(e, { stress: -25, mood: 20, energy: 10, happiness: 15 }); break
        case 'drama':      Object.assign(e, { stress: -15, mood: 15, happiness: 10 }); break
        case 'music':      Object.assign(e, { stress: -10, mood: 15, energy: 5, happiness: 8 }); break
        case 'craft':      Object.assign(e, { stress: -15, mood: 20, energy: -5, happiness: 20 }); break
        case 'pet':        Object.assign(e, { stress: -20, mood: 25, energy: 10, happiness: 20 }); break
      }
      break

    // ====== 打扮 ======
    case 'grooming':
      switch (subtype) {
        case 'makeup':     Object.assign(e, { mood: 15, happiness: 10, energy: -5 }); break
        case 'skincare':   Object.assign(e, { mood: 10, health: 5, stress: -5 }); break
        case 'hair':       Object.assign(e, { mood: 20, happiness: 15, energy: -10 }); break
      }
      break
  }

  return e
}

/**
 * 将行为效果应用到当前维度，返回新维度值（限制在 0-100 内）
 */
export function applyEffects(current: Dimensions, effects: Partial<Dimensions>): Dimensions {
  const result = { ...current }
  for (const [key, delta] of Object.entries(effects)) {
    if (delta !== undefined && key in result) {
      const k = key as keyof Dimensions
      result[k] = Math.max(0, Math.min(100, result[k] + delta))
    }
  }
  return result
}

/**
 * 根据维度值计算泡芙表情
 */
export function calcPandaMood(dims: Dimensions): import('../types').PandaMood {
  const avg = (dims.mood + dims.happiness + dims.energy - dims.stress + dims.health) / 5
  if (avg >= 80) return 'happy'
  if (avg >= 60) return 'energetic'
  if (avg >= 45) return 'neutral'
  if (avg >= 30) return 'sleepy'
  if (dims.stress >= 70) return 'stressed'
  return 'sad'
}
