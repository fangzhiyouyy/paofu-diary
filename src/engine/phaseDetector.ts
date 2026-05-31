import type { CyclePhase, PhaseRange } from '../types'

export function getToday(): string {
  return new Date().toISOString().split('T')[0]
}

export function detectPhase(today: string, phases: PhaseRange[]): {
  phase: CyclePhase | null
  dayOfCycle: number | null
} {
  if (!phases || phases.length === 0) return { phase: null, dayOfCycle: null }

  const t = new Date(today)
  const firstDay = new Date(phases[0].start)

  // 计算周期第几天
  const diffDays = Math.floor((t.getTime() - firstDay.getTime()) / 86400000) + 1
  if (diffDays < 1) return { phase: null, dayOfCycle: null }

  for (const p of phases) {
    const s = new Date(p.start)
    const e = new Date(p.end)
    if (t >= s && t <= e) {
      return { phase: p.phase, dayOfCycle: diffDays }
    }
  }

  return { phase: null, dayOfCycle: diffDays }
}

// 计算某个阶段的默认持续天数
export function getDefaultPhaseDays(phase: CyclePhase): number {
  switch (phase) {
    case 'menstrual': return 5
    case 'follicular': return 9
    case 'ovulation': return 4
    case 'luteal': return 10
  }
}
