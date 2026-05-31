import { useEffect, useState } from 'react'
import type { Dimensions } from '../types'

const LABELS: { key: keyof Dimensions; label: string; emoji: string }[] = [
  { key: 'mood', label: '心情', emoji: '💖' },
  { key: 'satiety', label: '饱腹', emoji: '🍜' },
  { key: 'sleep_quality', label: '睡眠', emoji: '😴' },
  { key: 'energy', label: '精力', emoji: '⚡' },
  { key: 'happiness', label: '幸福', emoji: '🌟' },
  { key: 'stress', label: '压力', emoji: '😰' },
  { key: 'health', label: '健康', emoji: '💪' },
]

interface Props {
  dimensions: Dimensions
  size?: number
}

export function StarChart({ dimensions, size = 240 }: Props) {
  const [animated, setAnimated] = useState(false)
  const cx = size / 2
  const cy = size / 2
  const radius = size * 0.3
  const n = LABELS.length
  const angleStep = (Math.PI * 2) / n
  const startAngle = -Math.PI / 2

  useEffect(() => { setAnimated(true) }, [])

  const getPoint = (i: number, r: number) => {
    const angle = startAngle + i * angleStep
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  }

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0]
  const dataPoints = LABELS.map((_, i) => {
    const val = dimensions[LABELS[i].key]
    const normalizedVal = LABELS[i].key === 'stress'
      ? (100 - val) / 100
      : val / 100
    return getPoint(i, radius * Math.max(0.04, normalizedVal))
  })

  const dataPath = dataPoints.map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`
  ).join(' ') + ' Z'

  // 计算中心值
  const centerVal = Math.round(
    (dimensions.mood + dimensions.happiness + dimensions.energy - dimensions.stress + dimensions.health) / 5
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* 背景光环 */}
        <circle cx={cx} cy={cy} r={radius + 16} fill="none" stroke="var(--color-border)" strokeWidth="0.5" opacity="0.3" />
        <circle cx={cx} cy={cy} r={radius * 0.5} fill="var(--phase-color, #C75B39)" opacity="0.04" />

        {/* 网格 */}
        {gridLevels.map((level, li) => {
          const pts = LABELS.map((_, i) => getPoint(i, radius * level))
          const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z'
          return (
            <path key={li} d={path} fill="none" stroke="var(--color-border)"
              strokeWidth={li === gridLevels.length - 1 ? 1.2 : 0.4}
              opacity={li === 0 ? 0.25 : 0.5} />
          )
        })}

        {/* 轴线 */}
        {LABELS.map((_, i) => {
          const p = getPoint(i, radius)
          return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y}
            stroke="var(--color-border)" strokeWidth={0.4} opacity={0.4} />
        })}

        {/* 数据填充 */}
        <path d={dataPath} fill="var(--phase-color, #C75B39)" fillOpacity={0.15}
          stroke="var(--phase-color, #C75B39)" strokeWidth={2.2} strokeLinejoin="round"
          strokeDasharray={animated ? '0' : '500'} strokeDashoffset={animated ? '0' : '500'}
          style={{ transition: 'stroke-dashoffset 0.8s ease-out' }} />

        {/* 数据点 */}
        {dataPoints.map((p, i) => {
          const isStress = LABELS[i].key === 'stress'
          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={5}
                fill={isStress ? '#FF6B6B' : 'var(--phase-color, #C75B39)'}
                stroke="#fff" strokeWidth={2.5} />
            </g>
          )
        })}

        {/* 中心圆 + 数字 */}
        <circle cx={cx} cy={cy} r={24} fill="#fff" stroke="var(--color-border)" strokeWidth="1" />
        <text x={cx} y={cy - 3} textAnchor="middle" dominantBaseline="middle"
          style={{ fontSize: 14, fontWeight: 700, fill: 'var(--phase-color, #C75B39)', fontFamily: 'var(--font-body)' }}>
          {centerVal}
        </text>
        <text x={cx} y={cy + 13} textAnchor="middle" dominantBaseline="middle"
          style={{ fontSize: 9, fill: 'var(--color-text-light)', fontFamily: 'var(--font-body)' }}>
          综合
        </text>

        {/* 轴外标签：emoji + 文字 */}
        {LABELS.map((label, i) => {
          const p = getPoint(i, radius + 32)
          const isStress = label.key === 'stress'
          return (
            <g key={i}>
              <text x={p.x} y={p.y - 6} textAnchor="middle" dominantBaseline="middle"
                style={{ fontSize: 15, fontFamily: 'var(--font-body)' }}>
                {label.emoji}
              </text>
              <text x={p.x} y={p.y + 10} textAnchor="middle" dominantBaseline="middle"
                style={{
                  fontSize: 11, fontWeight: 600,
                  fill: isStress ? '#FF6B6B' : 'var(--color-text)',
                  fontFamily: 'var(--font-body)',
                }}>
                {label.label}
              </text>
            </g>
          )
        })}
      </svg>

      {/* 底部数值条 */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center',
        marginTop: 4, padding: '0 12px',
      }}>
        {LABELS.map(l => {
          const val = dimensions[l.key]
          const pct = l.key === 'stress' ? (100 - val) : val
          const barColor = l.key === 'stress' ? '#FF6B6B' : 'var(--phase-color, #C75B39)'
          return (
            <div key={l.key} style={{
              display: 'flex', alignItems: 'center', gap: 4,
              background: '#fff', borderRadius: 12, padding: '3px 8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)', fontSize: 11,
            }}>
              <span>{l.emoji}</span>
              <span style={{ fontWeight: 600, minWidth: 16 }}>{val}</span>
              <div style={{ width: 28, height: 3, background: 'var(--color-border)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: barColor, borderRadius: 2, transition: 'width 0.5s ease' }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
