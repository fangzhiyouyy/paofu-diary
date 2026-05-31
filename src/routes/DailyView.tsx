import { useEffect, useState } from 'react'
import { useDailyStore } from '../stores/dailyStore'
import { useCycleStore } from '../stores/cycleStore'
import { useUIStore } from '../stores/uiStore'
import { PandaWidget } from '../components/PandaWidget'
import { StarChart } from '../components/StarChart'
import { TimelineCard } from '../components/TimelineCard'
import { BehaviorForm } from '../components/BehaviorForm'
import { PhaseBadge } from '../components/PhaseBadge'
import { detectPhase } from '../engine/phaseDetector'
import type { BehaviorType, CyclePhase } from '../types'
import { DEFAULT_DIMENSIONS } from '../types'

function fmtDate(d: Date) { return d.toISOString().split('T')[0] }

export function DailyView() {
  const { record, behaviors, loading, loadToday, addBehavior, removeBehavior } = useDailyStore()
  const { currentCycle } = useCycleStore()
  const { themeColor, themeBgColor, targetDate, clearTargetDate } = useUIStore()
  const [showForm, setShowForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState(() => fmtDate(new Date()))

  // 响应月视图跳转
  useEffect(() => {
    if (targetDate) {
      setSelectedDate(targetDate)
      clearTargetDate()
    }
  }, [targetDate, clearTargetDate])

  useEffect(() => {
    loadToday(selectedDate)
  }, [loadToday, selectedDate])

  const d = new Date(selectedDate + 'T00:00:00')
  const weekDays = ['日', '一', '二', '三', '四', '五', '六']
  const dateStr = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 星期${weekDays[d.getDay()]}`
  const isToday = selectedDate === fmtDate(new Date())

  // 根据选中日期检测阶段
  const { phase: displayPhase } = currentCycle?.phases
    ? detectPhase(selectedDate, currentCycle.phases)
    : { phase: null as CyclePhase | null }

  const goDay = (delta: number) => {
    const nd = new Date(selectedDate + 'T12:00:00')
    nd.setDate(nd.getDate() + delta)
    setSelectedDate(fmtDate(nd))
  }

  const handleAdd = async (type: BehaviorType, subtype: string, note: string) => {
    const now = new Date()
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    await addBehavior({
      date: selectedDate,
      type,
      subtype,
      time: timeStr,
      detail: {},
      note: note || undefined,
    })
  }

  if (loading) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 40, animation: 'bodyBounce 1s ease-in-out infinite' }}>🐾</div>
      </div>
    )
  }

  const dims = record?.current_dimensions

  return (
    <div style={{
      flex: 1,
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      paddingBottom: 80,
    }}>
      {/* 顶部：日期 + 阶段 */}
      <div style={{
        padding: 'calc(12px + var(--safe-top)) 20px 0',
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 4 }}>
          <button type="button" onClick={() => goDay(-1)} style={{
            border: 'none', background: 'var(--color-bg)', fontSize: 18, cursor: 'pointer',
            width: 44, height: 44, borderRadius: '50%',
            color: 'var(--color-text)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>◀</button>
          <div style={{ fontSize: 13, color: 'var(--color-text-light)', minWidth: 130, textAlign: 'center' }}>
            {dateStr}
            {isToday && <span style={{ color: themeColor, fontWeight: 600, marginLeft: 4 }}>· 今天</span>}
          </div>
          <button type="button" onClick={() => { if (!isToday) goDay(1) }} style={{
            border: 'none', background: isToday ? 'transparent' : 'var(--color-bg)', fontSize: 18,
            cursor: isToday ? 'default' : 'pointer',
            width: 44, height: 44, borderRadius: '50%',
            color: isToday ? 'var(--color-border)' : 'var(--color-text)',
            opacity: isToday ? 0.25 : 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>▶</button>
        </div>
        <PhaseBadge phase={displayPhase} />
      </div>

      {/* 泡芙动画 */}
      <PandaWidget
        mood={record?.panda_mood || 'neutral'}
        outfitColor={record?.outfit_color}
      />

      {/* 泡芙寄语 */}
      {record?.panda_quote && (
        <div style={{
          margin: '0 20px 16px',
          padding: '12px 16px',
          background: themeBgColor,
          borderRadius: 'var(--radius-lg)',
          fontSize: 14,
          color: themeColor,
          fontWeight: 500,
          textAlign: 'center',
          fontStyle: 'italic',
        }}>
          💬 泡芙说：「{record.panda_quote}」
        </div>
      )}

      {/* 七维星盘 */}
      <div style={{
        margin: '0 20px 20px',
        padding: '16px',
        background: '#fff',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div style={{
          fontSize: 14, fontWeight: 600, marginBottom: 8, textAlign: 'center',
        }}>
          🌟 七维星盘
        </div>
        <StarChart dimensions={dims || DEFAULT_DIMENSIONS} size={220} />
      </div>

      {/* 今日时间线 */}
      <div style={{ margin: '0 20px' }}>
        <div style={{
          fontSize: 14,
          fontWeight: 600,
          marginBottom: 8,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span>📋 今日时间线</span>
          {behaviors.length > 0 && (
            <span style={{ fontSize: 12, color: 'var(--color-text-light)', fontWeight: 400 }}>
              {behaviors.length} 条记录
            </span>
          )}
        </div>

        {behaviors.length === 0 ? (
          <div style={{
            padding: '32px 16px',
            textAlign: 'center',
            color: 'var(--color-text-light)',
            fontSize: 14,
            border: '2px dashed var(--color-border)',
            borderRadius: 'var(--radius-lg)',
          }}>
            🐾 今天还没有记录哦~<br />
            点击下方按钮开始记录吧
          </div>
        ) : (
          <div>
            {behaviors.map(b => (
              <TimelineCard key={b.id} behavior={b} onDelete={removeBehavior} />
            ))}
          </div>
        )}
      </div>

      {/* FAB 按钮 */}
      <button
        onClick={() => setShowForm(true)}
        style={{
          position: 'fixed',
          bottom: 100,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: 'none',
          background: themeColor,
          color: '#fff',
          fontSize: 28,
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s',
          WebkitTapHighlightColor: 'transparent',
        }}
        onTouchStart={e => { e.currentTarget.style.transform = 'scale(0.9)' }}
        onTouchEnd={e => { e.currentTarget.style.transform = 'scale(1)' }}
        onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.9)' }}
        onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
      >
        +
      </button>

      {/* 行为表单弹窗 */}
      {showForm && (
        <>
          <div
            onClick={() => setShowForm(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.3)',
              zIndex: 99,
            }}
          />
          <BehaviorForm
            onAdd={handleAdd}
            onClose={() => setShowForm(false)}
          />
        </>
      )}
    </div>
  )
}
