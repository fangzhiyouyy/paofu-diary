import { create } from 'zustand'
import type { CycleRecord, PhaseRange, CyclePhase } from '../types'
import { getCurrentCycle, getCycles, upsertCycle, generateDefaultPhases, calcHistoryAvg } from '../db/cycleRepo'
import { detectPhase, getToday } from '../engine/phaseDetector'

interface CycleState {
  currentCycle: CycleRecord | null
  historyCycles: CycleRecord[]
  currentPhase: CyclePhase | null
  dayOfCycle: number | null

  load: () => Promise<void>
  createFromPeriod: (periodStart: string) => Promise<void>
  updatePhases: (phases: PhaseRange[]) => Promise<void>
  getNewCycleDefaults: () => { periodDays: number; cycleDays: number }
}

export const useCycleStore = create<CycleState>((set, get) => ({
  currentCycle: null,
  historyCycles: [],
  currentPhase: null,
  dayOfCycle: null,

  load: async () => {
    const current = await getCurrentCycle()
    const history = await getCycles(12)
    const today = getToday()

    if (current?.phases) {
      const { phase, dayOfCycle } = detectPhase(today, current.phases)
      set({ currentCycle: current, historyCycles: history, currentPhase: phase, dayOfCycle })
    } else {
      set({ currentCycle: current, historyCycles: history, currentPhase: null, dayOfCycle: null })
    }
  },

  createFromPeriod: async (periodStart) => {
    const { getNewCycleDefaults } = get()
    const { periodDays, cycleDays } = getNewCycleDefaults()
    const phases = generateDefaultPhases(periodStart, periodDays, cycleDays)

    const cycle: Omit<CycleRecord, 'id'> = {
      created_at: new Date().toISOString(),
      phases,
      history_avg_cycle_length: cycleDays,
      history_avg_period_duration: periodDays,
    }

    const saved = await upsertCycle(cycle)
    const today = getToday()
    const { phase, dayOfCycle } = detectPhase(today, saved.phases)
    set({ currentCycle: saved, currentPhase: phase, dayOfCycle })
  },

  updatePhases: async (phases) => {
    const { currentCycle } = get()
    if (!currentCycle) return
    const updated = { ...currentCycle, phases }
    const saved = await upsertCycle(updated)
    const today = getToday()
    const { phase, dayOfCycle } = detectPhase(today, saved.phases)
    set({ currentCycle: saved, currentPhase: phase, dayOfCycle })
  },

  getNewCycleDefaults: () => {
    const { historyCycles } = get()
    const { avgCycleLength, avgPeriodDuration } = calcHistoryAvg(historyCycles)
    return { periodDays: avgPeriodDuration, cycleDays: avgCycleLength }
  },
}))
