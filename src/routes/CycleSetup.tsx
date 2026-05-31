import { useEffect, useState } from 'react'
import { useCycleStore } from '../stores/cycleStore'
import { useUIStore } from '../stores/uiStore'
import { PHASE_META } from '../types'
import type { PhaseRange } from '../types'

export function CycleSetup() {
  const { currentCycle, historyCycles, load, createFromPeriod, updatePhases, getNewCycleDefaults } = useCycleStore()
  const { setTheme } = useUIStore()
  const [editing, setEditing] = useState(false)
  const [editPhases, setEditPhases] = useState<PhaseRange[]>([])
  const [newPeriodStart, setNewPeriodStart] = useState('')
  const [showNewCycle, setShowNewCycle] = useState(false)

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    if (currentCycle?.phases) {
      setEditPhases(currentCycle.phases)
      const phase = currentCycle.phases.find(p => {
        const today = new Date().toISOString().split('T')[0]
        return today >= p.start && today <= p.end
      })
      setTheme(phase?.phase || null)
    }
  }, [currentCycle, setTheme])

  const handleSave = async () => {
    await updatePhases(editPhases)
    setEditing(false)
  }

  const handlePhaseChange = (index: number, field: 'start' | 'end', value: string) => {
    const updated = [...editPhases]
    updated[index] = { ...updated[index], [field]: value }
    setEditPhases(updated)
  }

  const handleCreateCycle = async () => {
    if (!newPeriodStart) return
    await createFromPeriod(newPeriodStart)
    setShowNewCycle(false)
    setNewPeriodStart('')
  }

  const defaults = getNewCycleDefaults()

  return (
    <div style={{
      flex: 1,
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      padding: 'calc(16px + var(--safe-top)) 16px calc(16px + var(--safe-bottom))',
    }}>
      <div style={{ fontSize: 18, fontWeight: 700, textAlign: 'center', marginBottom: 20 }}>
        ⚙️ 周期设置
      </div>

      {/* 当前周期 */}
      {currentCycle?.phases ? (
        <div style={{
          padding: 16,
          background: '#fff',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: 16,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}>
            <h4 style={{ fontSize: 15, fontWeight: 600 }}>📅 当前周期</h4>
            <button
              onClick={() => setEditing(!editing)}
              style={{
                padding: '6px 14px',
                border: '1.5px solid var(--panda-red)',
                borderRadius: 'var(--radius-full)',
                background: editing ? 'var(--panda-red)' : '#fff',
                color: editing ? '#fff' : 'var(--panda-red)',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                minHeight: 36,
              }}
            >
              {editing ? '取消' : '✎ 手动调整'}
            </button>
          </div>

          {editPhases.map((p, i) => {
            const meta = PHASE_META[p.phase]
            return (
              <div key={p.phase} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 0',
                borderBottom: i < 3 ? '1px solid var(--color-border)' : 'none',
              }}>
                <span style={{
                  width: 28, height: 28,
                  borderRadius: '50%',
                  background: meta.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  flexShrink: 0,
                }}>
                  {meta.emoji}
                </span>
                <span style={{ width: 56, fontSize: 13, fontWeight: 600 }}>{meta.label}</span>
                {editing ? (
                  <>
                    <input
                      type="date"
                      value={p.start}
                      onChange={e => handlePhaseChange(i, 'start', e.target.value)}
                      style={{
                        flex: 1,
                        padding: '6px 8px',
                        border: '1.5px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 13,
                        fontFamily: 'var(--font-body)',
                      }}
                    />
                    <span>→</span>
                    <input
                      type="date"
                      value={p.end}
                      onChange={e => handlePhaseChange(i, 'end', e.target.value)}
                      style={{
                        flex: 1,
                        padding: '6px 8px',
                        border: '1.5px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 13,
                        fontFamily: 'var(--font-body)',
                      }}
                    />
                  </>
                ) : (
                  <span style={{ fontSize: 13, color: 'var(--color-text-light)' }}>
                    {p.start} → {p.end}
                  </span>
                )}
              </div>
            )
          })}

          {editing && (
            <button
              onClick={handleSave}
              style={{
                width: '100%',
                marginTop: 16,
                padding: '12px',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                background: 'var(--panda-red)',
                color: '#fff',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                minHeight: 44,
              }}
            >
              ✅ 保存调整
            </button>
          )}
        </div>
      ) : (
        <div style={{
          padding: '24px 16px',
          textAlign: 'center',
          background: '#fff',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🐾</div>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>还没有设置周期</div>
          <div style={{ fontSize: 13, color: 'var(--color-text-light)', marginBottom: 16 }}>
            录入最近一次经期开始日，泡芙帮你自动推算四个阶段
          </div>
          <button
            onClick={() => setShowNewCycle(true)}
            style={{
              padding: '12px 24px',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              background: 'var(--panda-red)',
              color: '#fff',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              minHeight: 44,
            }}
          >
            🌹 设置周期
          </button>
        </div>
      )}

      {/* 新建周期弹窗 */}
      {showNewCycle && (
        <>
          <div onClick={() => setShowNewCycle(false)} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 99,
          }} />
          <div className="slide-up" style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: '#fff',
            borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
            padding: '20px 20px calc(20px + var(--safe-bottom))',
            boxShadow: '0 -4px 24px rgba(0,0,0,0.1)',
            zIndex: 100,
          }}>
            <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>🌹 新建周期</h4>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 13, color: 'var(--color-text-light)', display: 'block', marginBottom: 4 }}>
                经期开始日
              </label>
              <input
                type="date"
                value={newPeriodStart}
                onChange={e => setNewPeriodStart(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1.5px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 15,
                  fontFamily: 'var(--font-body)',
                }}
              />
            </div>
            <div style={{
              padding: '10px 14px',
              background: 'var(--color-bg)',
              borderRadius: 'var(--radius-md)',
              fontSize: 12,
              color: 'var(--color-text-light)',
              marginBottom: 16,
            }}>
              💡 默认使用历史均值：经期 {defaults.periodDays} 天 · 周期 {defaults.cycleDays} 天。<br />
              后续可在「手动调整」中修改任意阶段的日期。
            </div>
            <button
              onClick={handleCreateCycle}
              disabled={!newPeriodStart}
              style={{
                width: '100%',
                padding: '14px',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                background: newPeriodStart ? 'var(--panda-red)' : 'var(--color-border)',
                color: '#fff',
                fontSize: 16,
                fontWeight: 600,
                cursor: newPeriodStart ? 'pointer' : 'not-allowed',
                minHeight: 48,
              }}
            >
              ✅ 创建并自动填充
            </button>
          </div>
        </>
      )}

      {/* 历史周期 */}
      {historyCycles.length > 0 && (
        <div style={{
          padding: 16,
          background: '#fff',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>📊 历史周期</h4>
          {historyCycles.slice(0, 5).map((c, i) => {
            const period = c.phases?.find(p => p.phase === 'menstrual')
            return (
              <div key={c.id || i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: i < Math.min(historyCycles.length, 5) - 1 ? '1px solid var(--color-border)' : 'none',
                fontSize: 13,
              }}>
                <span style={{ color: 'var(--color-text-light)' }}>
                  {period ? `${period.start} → ${period.end}` : '—'}
                </span>
                <span style={{ fontWeight: 500 }}>
                  {c.history_avg_cycle_length || '—'} 天
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
