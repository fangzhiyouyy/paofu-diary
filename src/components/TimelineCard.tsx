import type { Behavior } from '../types'
import { BEHAVIOR_META } from '../types'

interface Props {
  behavior: Behavior
  onDelete: (id: string) => void
}

export function TimelineCard({ behavior, onDelete }: Props) {
  const meta = BEHAVIOR_META[behavior.type]
  const effects = behavior.effects || {}
  const effectEntries = Object.entries(effects).filter(([, v]) => v !== 0)

  return (
    <div style={{
      display: 'flex',
      gap: 12,
      padding: '10px 0',
      position: 'relative',
    }}>
      {/* 时间线竖线 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexShrink: 0,
        width: 40,
      }}>
        <span style={{
          fontSize: 12,
          color: 'var(--color-text-light)',
          fontWeight: 500,
        }}>
          {behavior.time}
        </span>
        <div style={{
          width: 2,
          flex: 1,
          background: 'var(--color-border)',
          marginTop: 4,
        }} />
      </div>

      {/* 内容卡片 */}
      <div style={{
        flex: 1,
        background: '#fff',
        borderRadius: 'var(--radius-md)',
        padding: '12px 14px',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: 8,
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>{meta.emoji}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{meta.label}</div>
              {behavior.note && (
                <div style={{ fontSize: 12, color: 'var(--color-text-light)', marginTop: 2 }}>
                  {behavior.note}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => onDelete(behavior.id)}
            style={{
              border: 'none',
              background: 'none',
              color: 'var(--color-text-light)',
              fontSize: 16,
              cursor: 'pointer',
              padding: '4px 8px',
              opacity: 0.5,
              minWidth: 44,
              minHeight: 44,
            }}
          >
            ✕
          </button>
        </div>

        {/* 效果标签 */}
        {effectEntries.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            marginTop: 8,
            paddingTop: 8,
            borderTop: '1px solid var(--color-border)',
          }}>
            {effectEntries.map(([dim, val]) => {
              const isPositive = (dim === 'stress') ? val < 0 : val > 0
              const emojiMap: Record<string, string> = {
                mood: '💖', satiety: '🍜', sleep_quality: '😴',
                energy: '⚡', happiness: '🌟', stress: '😰', health: '💪',
              }
              return (
                <span key={dim} style={{
                  fontSize: 11,
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  background: isPositive ? '#E8F5E9' : '#FCE4EC',
                  color: isPositive ? '#2E7D32' : '#C62828',
                  fontWeight: 500,
                }}>
                  {emojiMap[dim] || dim} {val > 0 ? '+' : ''}{val}
                </span>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
