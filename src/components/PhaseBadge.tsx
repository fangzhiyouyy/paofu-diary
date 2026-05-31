import type { CyclePhase } from '../types'
import { PHASE_META } from '../types'

interface Props {
  phase: CyclePhase | null
}

export function PhaseBadge({ phase }: Props) {
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
    </div>
  )
}
