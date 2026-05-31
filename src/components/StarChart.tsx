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
  const cx = size / 2
  const cy = size / 2
  const radius = size * 0.34
  const n = LABELS.length
  const angleStep = (Math.PI * 2) / n
  const startAngle = -Math.PI / 2 // 从顶部开始

  // 计算各顶点的坐标
  const getPoint = (i: number, r: number) => {
    const angle = startAngle + i * angleStep
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    }
  }

  // 背景网格（5 层）
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0]

  // 数据路径
  const dataPoints = LABELS.map((_, i) => {
    const val = dimensions[LABELS[i].key]
    // 压力是反向的：越高越差，但在雷达图上应该显示为更小的面积
    const normalizedVal = LABELS[i].key === 'stress'
      ? (100 - val) / 100
      : val / 100
    return getPoint(i, radius * Math.max(0.05, normalizedVal))
  })

  const dataPath = dataPoints.map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`
  ).join(' ') + ' Z'

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
    }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* 网格 */}
        {gridLevels.map((level, li) => {
          const pts = LABELS.map((_, i) => getPoint(i, radius * level))
          const path = pts.map((p, i) =>
            `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`
          ).join(' ') + ' Z'
          return (
            <path
              key={li}
              d={path}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth={li === gridLevels.length - 1 ? 1.5 : 0.5}
              opacity={li === 0 ? 0.3 : 0.6}
            />
          )
        })}

        {/* 轴线 */}
        {LABELS.map((_, i) => {
          const p = getPoint(i, radius)
          return (
            <line
              key={i}
              x1={cx} y1={cy}
              x2={p.x} y2={p.y}
              stroke="var(--color-border)"
              strokeWidth={0.5}
              opacity={0.5}
            />
          )
        })}

        {/* 数据区域 */}
        <path
          d={dataPath}
          fill="var(--phase-color, #C75B39)"
          fillOpacity={0.2}
          stroke="var(--phase-color, #C75B39)"
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {/* 数据点 */}
        {dataPoints.map((p, i) => (
          <circle
            key={i}
            cx={p.x} cy={p.y}
            r={4}
            fill="var(--phase-color, #C75B39)"
            stroke="#fff"
            strokeWidth={2}
          />
        ))}

        {/* 标签 */}
        {LABELS.map((label, i) => {
          const p = getPoint(i, radius + 28)
          return (
            <text
              key={i}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: 12,
                fill: 'var(--color-text)',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
              }}
            >
              {label.emoji}
            </text>
          )
        })}
      </svg>

      {/* 图例 */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2px 12px',
        justifyContent: 'center',
        fontSize: 11,
        color: 'var(--color-text-light)',
      }}>
        {LABELS.map(l => (
          <span key={l.key}>
            {l.emoji} {dimensions[l.key]}
          </span>
        ))}
      </div>
    </div>
  )
}
