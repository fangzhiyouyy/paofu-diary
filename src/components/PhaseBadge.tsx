import type { CyclePhase } from '../types'
import { PHASE_META } from '../types'

interface Props {
  phase: CyclePhase | null
  dayOfCycle: number | null
}

export function PhaseBadge({ phase, dayOfCycle }: Props) {
  if (!phase) return null
  const meta = PHASE_META[phase]

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 12px',
      borderRadius: 'var(--radius-full)',
      background: meta.bgColor,
      color: meta.color,
      fontSize: 13,
      fontWeight: 600,
    }}>
      <span>{meta.emoji}</span>
      <span>{meta.label}</span>
      {dayOfCycle && <span style={{ opacity: 0.7 }}>· 第{dayOfCycle}天</span>}
    </div>
  )
}
