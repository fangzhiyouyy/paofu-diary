import { useState, useRef, useEffect, useCallback } from 'react'
import type { FoodItem } from '../data/foods'
import { ALL_FOODS } from '../data/foods'

const REEL_COUNT = 3
const VISIBLE_ITEMS = 5 // odd number so middle is center

interface Props {
  onResult: (food: FoodItem) => void
}

export function FoodSlots({ onResult }: Props) {
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<FoodItem | null>(null)
  const [isJackpot, setIsJackpot] = useState(false)
  const [offsets, setOffsets] = useState([0, 0, 0])
  const reelsRef = useRef<FoodItem[][]>([[], [], []])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Initialize reels
  useEffect(() => {
    reelsRef.current = [
      [...ALL_FOODS].sort(() => Math.random() - 0.5).slice(0, 20),
      [...ALL_FOODS].sort(() => Math.random() - 0.5).slice(0, 20),
      [...ALL_FOODS].sort(() => Math.random() - 0.5).slice(0, 20),
    ]
  }, [])

  const spin = useCallback(() => {
    if (spinning) return
    setSpinning(true)
    setResult(null)
    setIsJackpot(false)

    // Refresh reel pools
    reelsRef.current = [
      [...ALL_FOODS].sort(() => Math.random() - 0.5).slice(0, 20),
      [...ALL_FOODS].sort(() => Math.random() - 0.5).slice(0, 20),
      [...ALL_FOODS].sort(() => Math.random() - 0.5).slice(0, 20),
    ]

    const speeds = [8, 10, 12]

    let tick = 0
    const maxTicks = 40

    timerRef.current = setInterval(() => {
      tick++
      const newOffsets = reelsRef.current.map((reel, i) => {
        const speed = speeds[i]
        return (tick * speed) % reel.length
      })
      setOffsets(newOffsets)

      if (tick >= maxTicks) {
        if (timerRef.current !== null) clearInterval(timerRef.current)
        // Determine final positions
        const final: number[] = []
        const results: (FoodItem | null)[] = []
        for (let i = 0; i < REEL_COUNT; i++) {
          const reel = reelsRef.current[i]
          const idx = Math.floor(Math.random() * reel.length)
          final.push(idx)
          results.push(reel[idx])
        }
        setOffsets(final)
        setSpinning(false)

        // Check jackpot
        if (results[0]?.name === results[1]?.name && results[1]?.name === results[2]?.name) {
          setIsJackpot(true)
          setResult(results[0]!)
          onResult(results[0]!)
        } else {
          // Middle reel wins
          const winner = results[1]!
          setResult(winner)
          onResult(winner)
        }
      }
    }, 80)
  }, [spinning, onResult])

  // Cleanup
  useEffect(() => {
    return () => { if (timerRef.current !== null) clearInterval(timerRef.current) }
  }, [])

  const itemH = 56
  const wrapperH = itemH * VISIBLE_ITEMS

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0' }}>
      {/* 顶部装饰 */}
      <div style={{
        fontSize: 14,
        color: '#999',
        marginBottom: 12,
        textAlign: 'center',
      }}>
        对齐三个一样的 🎰 泡芙就奖励你…✨
      </div>

      {/* 三列滚筒 */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        {[0, 1, 2].map(colIdx => (
          <div key={colIdx} style={{
            width: 80,
            height: wrapperH,
            background: '#1a1a2e',
            borderRadius: 12,
            overflow: 'hidden',
            position: 'relative',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.2)',
            border: '3px solid #444',
          }}>
            {/* 发光高亮行 */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: -3,
              right: -3,
              height: itemH,
              transform: 'translateY(-50%)',
              borderTop: '2px solid #FFD700',
              borderBottom: '2px solid #FFD700',
              background: 'rgba(255,215,0,0.08)',
              zIndex: 2,
              pointerEvents: 'none',
              boxShadow: 'inset 0 0 12px rgba(255,215,0,0.15)',
            }} />

            {/* 内容滚动 */}
            <div style={{
              position: 'absolute',
              top: -(itemH * Math.floor(VISIBLE_ITEMS / 2)),
              left: 0,
              right: 0,
              transform: `translateY(${-offsets[colIdx] * itemH}px)`,
              transition: spinning ? 'none' : 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}>
              {reelsRef.current[colIdx].map((food, i) => (
                <div key={i} style={{
                  height: itemH,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  padding: '4px',
                }}>
                  <span>{food.emoji}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
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
          background: spinning ? '#ccc' : 'var(--phase-color, #FFB347)',
          color: '#fff',
          fontSize: 16,
          fontWeight: 600,
          cursor: spinning ? 'not-allowed' : 'pointer',
        }}
      >
        {spinning ? '🎰 转动中...' : '🎰 开始'}
      </button>

      {/* 结果 */}
      {result && !spinning && (
        <div style={{
          marginTop: 16,
          padding: '12px 20px',
          background: isJackpot ? '#FFF3E0' : '#FFF9E6',
          borderRadius: 16,
          textAlign: 'center',
          maxWidth: 280,
          border: isJackpot ? '2px solid #FFB347' : 'none',
        }}>
          {isJackpot && (
            <div style={{ fontSize: 24, marginBottom: 4 }}>✨🎉✨</div>
          )}
          <div style={{ fontSize: 13, color: '#999', marginBottom: 4 }}>
            {isJackpot ? '🎊 三连中！天意！' : '泡芙觉得中间这个最适合你~'}
          </div>
          <div style={{ fontSize: 28 }}>{result.emoji}</div>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{result.name}</div>
          <div style={{ fontSize: 12, color: '#666', lineHeight: 1.5 }}>{result.comment}</div>
        </div>
      )}
    </div>
  )
}
