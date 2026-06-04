import { useState, useCallback } from 'react'
import type { FoodItem } from '../data/foods'
import { getRandomFoods, MYSTERY_BOX } from '../data/foods'

const WHEEL_COLORS = ['#FF6B6B', '#FFB347', '#FFE66D', '#51CF66', '#4ECDC4', '#A78BFA', '#F472B6', '#FB923C']
const SECTOR_COUNT = 8

interface Props {
  onResult: (food: FoodItem) => void
}

export function FoodWheel({ onResult }: Props) {
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [foods, setFoods] = useState<FoodItem[]>(() => {
    const picks = getRandomFoods(7)
    picks.push(MYSTERY_BOX)
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
      // pointer is at top (0 deg), wheel rotates clockwise
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
      const picks = getRandomFoods(7)
      picks.push(MYSTERY_BOX)
      return picks
    })
  }

  const sectorDeg = 360 / SECTOR_COUNT

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0' }}>
      {/* 指针 */}
      <div style={{
        width: 0, height: 0,
        borderLeft: '14px solid transparent',
        borderRight: '14px solid transparent',
        borderTop: '24px solid #e74c3c',
        zIndex: 2,
        marginBottom: -8,
        filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))',
      }} />

      {/* 转盘 */}
      <div style={{
        width: 260,
        height: 260,
        borderRadius: '50%',
        position: 'relative',
        overflow: 'hidden',
        transform: `rotate(${rotation}deg)`,
        transition: spinning ? 'transform 4s cubic-bezier(0.15, 0.7, 0.1, 0.99)' : 'none',
        boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
      }}>
        {/* 扇形背景 */}
        <svg width="260" height="260" viewBox="0 0 260 260" style={{ position: 'absolute', top: 0, left: 0 }}>
          {Array.from({ length: SECTOR_COUNT }).map((_, i) => {
            const startAngle = (i * sectorDeg - 90) * Math.PI / 180
            const endAngle = ((i + 1) * sectorDeg - 90) * Math.PI / 180
            const cx = 130, cy = 130, r = 130
            const x1 = cx + r * Math.cos(startAngle)
            const y1 = cy + r * Math.sin(startAngle)
            const x2 = cx + r * Math.cos(endAngle)
            const y2 = cy + r * Math.sin(endAngle)
            const largeArc = sectorDeg > 180 ? 1 : 0
            return (
              <path
                key={i}
                d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                fill={WHEEL_COLORS[i]}
                stroke="#fff"
                strokeWidth="1.5"
              />
            )
          })}
          {/* 中心圆 */}
          <circle cx="130" cy="130" r="36" fill="#fff" stroke="#e0e0e0" strokeWidth="2" />
        </svg>

        {/* 食物标签 */}
        {foods.map((food, i) => {
          const midAngle = ((i * sectorDeg + sectorDeg / 2) - 90) * Math.PI / 180
          const labelR = 85
          const lx = 130 + labelR * Math.cos(midAngle) - 22
          const ly = 130 + labelR * Math.sin(midAngle) - 18
          return (
            <div key={i} style={{
              position: 'absolute',
              left: lx,
              top: ly,
              width: 44,
              textAlign: 'center',
              lineHeight: 1.2,
              fontSize: 11,
              fontWeight: 600,
              color: '#333',
              pointerEvents: 'none',
            }}>
              <div style={{ fontSize: 22 }}>{food.emoji}</div>
              <div style={{ fontSize: 11 }}>{food.name}</div>
            </div>
          )
        })}

        {/* 中心泡芙图标 */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 30,
          pointerEvents: 'none',
          zIndex: 3,
        }}>
          🐾
        </div>
      </div>

      {/* 按钮 */}
      <button
        onClick={spinning ? undefined : spin}
        disabled={spinning}
        style={{
          marginTop: 20,
          padding: '12px 40px',
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

      {/* 结果 */}
      {result && !spinning && (
        <div style={{
          marginTop: 16,
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
