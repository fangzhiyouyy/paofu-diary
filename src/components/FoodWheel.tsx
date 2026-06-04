import { useState, useCallback } from 'react'
import type { FoodItem } from '../data/foods'
import { getRandomFoods, MYSTERY_BOX } from '../data/foods'

const WHEEL_COLORS = [
  '#FF6B6B', '#FF8E53', '#FFB347', '#FFD93D', '#C0EB6A',
  '#6BCB77', '#4ECDC4', '#45B7D1', '#5B9BD5', '#7B68EE',
  '#A78BFA', '#E879F9', '#F472B6', '#FB7185', '#F43F5E',
  '#F59E0B', '#14B8A6', '#06B6D4', '#8B5CF6', '#EC4899',
]
const SECTOR_COUNT = 20

interface Props {
  onResult: (food: FoodItem) => void
}

export function FoodWheel({ onResult }: Props) {
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [foods, setFoods] = useState<FoodItem[]>(() => {
    const picks = getRandomFoods(SECTOR_COUNT - 1)
    picks.splice(Math.floor(Math.random() * SECTOR_COUNT), 0, MYSTERY_BOX)
    return picks
  })
  const [result, setResult] = useState<FoodItem | null>(null)

  const spin = useCallback(() => {
    if (spinning) return
    setSpinning(true)
    setResult(null)
    const extra = 1800 + Math.random() * 1800
    const newRotation = rotation + extra
    setRotation(newRotation)
    setTimeout(() => {
      setSpinning(false)
      const finalDeg = newRotation % 360
      const sectorDeg = 360 / SECTOR_COUNT
      const sectorIndex = Math.floor(((360 - finalDeg) % 360) / sectorDeg) % SECTOR_COUNT
      const food = foods[sectorIndex]
      if (food.emoji === '❓') {
        const allFoods = getRandomFoods(1)
        setResult({ ...allFoods[0], comment: '泡芙盲盒开出了惊喜！' + allFoods[0].comment })
        onResult(allFoods[0])
      } else {
        setResult(food)
        onResult(food)
      }
    }, 4200)
  }, [spinning, rotation, foods, onResult])

  const reset = () => {
    setResult(null)
    setFoods(() => {
      const picks = getRandomFoods(SECTOR_COUNT - 1)
      picks.splice(Math.floor(Math.random() * SECTOR_COUNT), 0, MYSTERY_BOX)
      return picks
    })
  }

  const sectorDeg = 360 / SECTOR_COUNT
  const wheelSize = 300

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4px 0' }}>
      {/* 指针 */}
      <div style={{
        width: 0, height: 0,
        borderLeft: '16px solid transparent',
        borderRight: '16px solid transparent',
        borderTop: '28px solid #e74c3c',
        zIndex: 2,
        marginBottom: -10,
        filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.25))',
      }} />

      {/* 转盘 */}
      <div style={{
        width: wheelSize,
        height: wheelSize,
        borderRadius: '50%',
        position: 'relative',
        overflow: 'hidden',
        transform: `rotate(${rotation}deg)`,
        transition: spinning ? 'transform 4s cubic-bezier(0.15, 0.7, 0.1, 0.99)' : 'none',
        boxShadow: '0 4px 28px rgba(0,0,0,0.18)',
      }}>
        {/* 扇形背景 */}
        <svg width={wheelSize} height={wheelSize} viewBox={`0 0 ${wheelSize} ${wheelSize}`} style={{ position: 'absolute', top: 0, left: 0 }}>
          {Array.from({ length: SECTOR_COUNT }).map((_, i) => {
            const startAngle = (i * sectorDeg - 90) * Math.PI / 180
            const endAngle = ((i + 1) * sectorDeg - 90) * Math.PI / 180
            const cx = wheelSize / 2, cy = wheelSize / 2, r = wheelSize / 2
            const x1 = cx + r * Math.cos(startAngle)
            const y1 = cy + r * Math.sin(startAngle)
            const x2 = cx + r * Math.cos(endAngle)
            const y2 = cy + r * Math.sin(endAngle)
            return (
              <path
                key={i}
                d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`}
                fill={WHEEL_COLORS[i]}
                stroke="#fff"
                strokeWidth="1.5"
              />
            )
          })}
          <circle cx={wheelSize / 2} cy={wheelSize / 2} r="36" fill="#fff" stroke="#e0e0e0" strokeWidth="2" />
        </svg>

        {/* 食物标签 */}
        {foods.map((food, i) => {
          const midAngle = ((i * sectorDeg + sectorDeg / 2) - 90) * Math.PI / 180
          const labelR = wheelSize / 2 - 48
          const lx = wheelSize / 2 + labelR * Math.cos(midAngle) - 18
          const ly = wheelSize / 2 + labelR * Math.sin(midAngle) - 9
          return (
            <div key={i} style={{
              position: 'absolute',
              left: lx,
              top: ly,
              width: 36,
              textAlign: 'center',
              lineHeight: 1,
              pointerEvents: 'none',
            }}>
              <div style={{ fontSize: 16 }}>{food.emoji}</div>
              <div style={{ fontSize: 9, fontWeight: 600, color: '#333', marginTop: 1 }}>{food.name}</div>
            </div>
          )
        })}

        {/* 中心图标 */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 32,
          pointerEvents: 'none',
          zIndex: 3,
        }}>
          🐾
        </div>
      </div>

      <button
        onClick={spinning ? undefined : spin}
        disabled={spinning}
        style={{
          marginTop: 18,
          padding: '11px 38px',
          border: 'none',
          borderRadius: 24,
          background: spinning ? '#ccc' : 'var(--phase-color, #FF6B6B)',
          color: '#fff',
          fontSize: 16,
          fontWeight: 600,
          cursor: spinning ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
        }}
      >
        {spinning ? '🎡 转动中...' : '🎡 开始转动'}
      </button>

      {!spinning && (
        <button
          onClick={reset}
          style={{
            marginTop: 10,
            padding: '9px 28px',
            border: '1.5px solid var(--color-border)',
            borderRadius: 20,
            background: '#fff',
            color: 'var(--color-text)',
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          🎲 随机转盘
        </button>
      )}

      {result && !spinning && (
        <div style={{
          marginTop: 14,
          padding: '12px 20px',
          background: '#FFF9E6',
          borderRadius: 16,
          textAlign: 'center',
          maxWidth: 280,
        }}>
          <div style={{ fontSize: 13, color: '#999', marginBottom: 4 }}>泡芙推荐</div>
          <div style={{ fontSize: 28 }}>{result.emoji}</div>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{result.name}</div>
          <div style={{ fontSize: 12, color: '#666', lineHeight: 1.5 }}>{result.comment}</div>
          <button
            onClick={reset}
            style={{
              marginTop: 10,
              padding: '6px 20px',
              border: '1.5px solid var(--color-border)',
              borderRadius: 16,
              background: '#fff',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            🔄 再来一次
          </button>
        </div>
      )}
    </div>
  )
}
