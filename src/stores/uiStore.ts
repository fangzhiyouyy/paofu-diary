import { create } from 'zustand'
import type { CyclePhase } from '../types'
import { PHASE_META } from '../types'

interface UIState {
  activeTab: 'daily' | 'monthly' | 'chat' | 'settings'
  themeColor: string
  themeBgColor: string
  themeEmoji: string
  targetDate: string | null
  setTab: (tab: UIState['activeTab']) => void
  setTheme: (phase: CyclePhase | null) => void
  navigateToDate: (date: string) => void
  clearTargetDate: () => void
}

export const useUIStore = create<UIState>((set) => ({
  activeTab: 'daily',
  themeColor: '#C75B39',
  themeBgColor: '#FFFAF5',
  themeEmoji: '🐾',
  targetDate: null,

  setTab: (tab) => set({ activeTab: tab }),

  setTheme: (phase) => {
    if (phase && PHASE_META[phase]) {
      const m = PHASE_META[phase]
      set({ themeColor: m.color, themeBgColor: m.bgColor, themeEmoji: m.emoji })
    } else {
      set({ themeColor: '#C75B39', themeBgColor: '#FFFAF5', themeEmoji: '🐾' })
    }
  },

  navigateToDate: (date) => set({ targetDate: date, activeTab: 'daily' }),
  clearTargetDate: () => set({ targetDate: null }),
}))
