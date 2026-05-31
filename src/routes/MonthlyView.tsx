import { useEffect, useState } from 'react'
import { useCycleStore } from '../stores/cycleStore'
import { useUIStore } from '../stores/uiStore'
import { getMonthRecords } from '../db/dailyRepo'
import { PHASE_META } from '../types'
import type { DailyRecord, CyclePhase } from '../types'

export function MonthlyView() {
  const { currentCycle, load } = useCycleStore()
  const { navigateToDate } = useUIStore()
  const [records, setRecords] = useState<DailyRecord[]>([])
  const [viewDate] = useState(() => {
    const d = new Date()
    return { year: d.getFullYear(), month: d.getMonth() + 1 }
  })

  useEffect(() => {
    load()
    getMonthRecords(viewDate.year, viewDate.month).then(setRecords)
  }, [load, viewDate])

  const recordMap = new Map(records.map(r => [r.date, r]))
  const weekDays = ['日', '一', '二', '三', '四', '五', '六']

  // 计算日历格子
  const firstDay = new Date(viewDate.year, viewDate.month - 1, 1)
  const lastDay = new Date(viewDate.year, viewDate.month, 0)
  const startDayOfWeek = firstDay.getDay()
  const daysInMonth = lastDay.getDate()

  const cells: (number | null)[] = []
  for (let i = 0; i < startDayOfWeek; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  // 找到每个日期对应的阶段
  const getPhaseColor = (day: number): { bg: string; color: string } | null => {
    if (!currentCycle?.phases) return null
    const dateStr = `${viewDate.year}-${String(viewDate.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    for (const p of currentCycle.phases) {
      if (dateStr >= p.start && dateStr <= p.end) {
        const meta = PHASE_META[p.phase]
        return { bg: meta.bgColor, color: meta.color }
      }
    }
    return null
  }

  const getRecord = (day: number): DailyRecord | undefined => {
    const dateStr = `${viewDate.year}-${String(viewDate.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return recordMap.get(dateStr)
  }

  const MOOD_EMOJI: Record<string, string> = {
    happy: '😊', energetic: '💪', neutral: '😐', sleepy: '😴', sad: '😢', stressed: '😰',
  }

  // 本月简单统计
  const monthRecords = records.filter(r => r.current_dimensions)
  const avgMood = monthRecords.length > 0
    ? Math.round(monthRecords.reduce((s, r) => s + (r.current_dimensions?.mood || 0), 0) / monthRecords.length)
    : null

  // 穿搭色卡
  const outfitColors = records
    .filter(r => r.outfit_color)
    .map(r => ({ date: r.date, hex: r.outfit_color!, name: r.outfit_name! }))

  return (
    <div style={{
      flex: 1,
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      padding: 'calc(16px + var(--safe-top)) 16px calc(16px + var(--safe-bottom))',
    }}>
      {/* 标题 */}
      <div style={{
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 700,
        marginBottom: 16,
      }}>
        📅 {viewDate.year}年{viewDate.month}月 · 泡芙月历
      </div>

      {/* 日历 */}
      <div style={{
        background: '#fff',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
        marginBottom: 16,
      }}>
        {/* 星期头 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          textAlign: 'center',
          padding: '10px 4px',
          borderBottom: '1px solid var(--color-border)',
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--color-text-light)',
        }}>
          {weekDays.map(w => <div key={w}>{w}</div>)}
        </div>

        {/* 日期格子 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 2,
          padding: 4,
        }}>
          {cells.map((day, i) => {
            if (day === null) return <div key={`e-${i}`} />
            const phaseStyle = getPhaseColor(day)
            const record = getRecord(day)
            const isToday = day === new Date().getDate()
              && viewDate.month === new Date().getMonth() + 1
              && viewDate.year === new Date().getFullYear()

            const dateStr = `${viewDate.year}-${String(viewDate.month).padStart(2,'0')}-${String(day).padStart(2,'0')}`
            return (
              <button
                key={day}
                onClick={() => navigateToDate(dateStr)}
                style={{
                  aspectRatio: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-sm)',
                  background: phaseStyle?.bg || 'transparent',
                  border: isToday ? `2px solid var(--panda-red)` : '2px solid transparent',
                  position: 'relative',
                  fontSize: 13,
                  fontWeight: isToday ? 700 : 500,
                  color: phaseStyle?.color || 'var(--color-text)',
                  cursor: 'pointer',
                  minHeight: 44,
                  padding: 0,
                  outline: 'none',
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation',
                }}
              >
                {/* 泡芙迷你表情 */}
                {record && (
                  <span style={{ fontSize: 16, lineHeight: 1 }}>
                    {MOOD_EMOJI[record.panda_mood] || '🐾'}
                  </span>
                )}
                <span style={{ fontSize: 12 }}>{day}</span>
                {/* 穿搭色点 */}
                {record?.outfit_color && (
                  <div style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: record.outfit_color,
                    position: 'absolute',
                    bottom: 3,
                    right: 5,
                  }} />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* 图例 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 14,
        marginBottom: 16,
        fontSize: 11,
        flexWrap: 'wrap',
      }}>
        {(Object.entries(PHASE_META) as [CyclePhase, typeof PHASE_META[CyclePhase]][]).map(([key, meta]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{
              width: 10, height: 10,
              borderRadius: 3,
              background: meta.color,
            }} />
            <span>{meta.emoji} {meta.label}</span>
          </div>
        ))}
      </div>

      {/* 本月简报 */}
      {avgMood !== null && (
        <div style={{
          padding: 16,
          background: '#fff',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>📊 本月泡芙简报</div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13 }}>
            <div>
              💖 平均心情 <strong>{avgMood}</strong> 分
            </div>
            <div>
              📝 记录 <strong>{records.length}</strong> 天
            </div>
            {currentCycle && (
              <div>
                🔄 周期 <strong>{currentCycle.history_avg_cycle_length || '—'}</strong> 天
              </div>
            )}
          </div>
        </div>
      )}

      {/* 穿搭色卡 */}
      {outfitColors.length > 0 && (
        <div style={{
          padding: 16,
          background: '#fff',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>👗 本月穿搭色卡</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {outfitColors.map((oc, i) => (
              <div
                key={i}
                title={`${oc.date}: ${oc.name}`}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: oc.hex,
                  border: '1px solid var(--color-border)',
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
