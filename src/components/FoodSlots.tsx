import { useState, useRef, useEffect, useCallback } from 'react'
import type { FoodItem } from '../data/foods'
import { ALL_FOODS } from '../data/foods'

const REEL_COUNT = 3
const VISIBLE_ITEMS = 5
const CENTER_IDX = Math.floor(VISIBLE_ITEMS / 2)

function shuffledPool(): FoodItem[] {
  return [...ALL_FOODS].sort(() => Math.random() - 0.5).slice(0, 30)
}

interface Props {
  onResult: (food: FoodItem) => void
}

export function FoodSlots({ onResult }: Props) {
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<FoodItem | null>(null)
  const [isJackpot, setIsJackpot] = useState(false)
  const [, forceUpdate] = useState(0)
  const poolsRef = useRef<FoodItem[][]>([shuffledPool(), shuffledPool(), shuffledPool()])
  const offsetsRef = useRef([0, 0, 0])
  const rafRef = useRef(0)

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  const spin = useCallback(() => {
    if (spinning) return
    setSpinning(true)
    setResult(null)
    setIsJackpot(false)

    // Fresh pools
    const pools = [shuffledPool(), shuffledPool(), shuffledPool()]
    poolsRef.current = pools
    offsetsRef.current = [0, 0, 0]
    forceUpdate(n => n + 1)

    // Pick targets
    const targetIdx = pools.map(p => Math.floor(Math.random() * p.length))

    // Jackpot check
    if (
      pools[0][targetIdx[0]].name === pools[1][targetIdx[1]].name &&
      pools[1][targetIdx[1]].name === pools[2][targetIdx[2]].name
    ) {
      setIsJackpot(true)
    }

    const startTime = performance.now()
    const stopTimes = [1200, 1950, 2400] // ms: when each reel starts decelerating
    const fullSpeed = 16
    const stopped = [false, false, false]

    const animate = (now: number) => {
      const elapsed = now - startTime
      const off = [...offsetsRef.current]

      for (let i = 0; i < REEL_COUNT; i++) {
        if (stopped[i]) continue // 已定格，不再动

        const poolLen = pools[i].length
        const targetOffset = targetIdx[i] - CENTER_IDX + poolLen * 8

        if (elapsed < stopTimes[i]) {
          // 全速阶段
          off[i] += (fullSpeed * 16.67) / 1000
        } else {
          const decelElapsed = elapsed - stopTimes[i]
          const decelDuration = 900
          if (decelElapsed < decelDuration) {
            // 减速阶段
            const t = decelElapsed / decelDuration
            const speed = fullSpeed * (1 - t) * (1 - t * 0.5)
            off[i] += (speed * 16.67) / 1000
            if (off[i] >= targetOffset) {
              off[i] = targetOffset
              stopped[i] = true
            }
          } else {
            // 时间到，直接定格
            off[i] = targetOffset
            stopped[i] = true
          }
        }
      }

      offsetsRef.current = off
      forceUpdate(n => n + 1)

      if (stopped.every(s => s)) {
        setSpinning(false)
        const results = pools.map((p, i) => p[targetIdx[i]])
        setResult(results[1])
        onResult(results[1])
        return
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [spinning, onResult])

  const itemH = 56
  const wrapperH = itemH * VISIBLE_ITEMS

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0' }}>
      <div style={{
        fontSize: 14, color: '#999', marginBottom: 12, textAlign: 'center',
      }}>
        对齐三个一样的 🎰 泡芙就奖励你…✨
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        {[0, 1, 2].map(colIdx => {
          const pool = poolsRef.current[colIdx]
          const displayOffset = offsetsRef.current[colIdx]
          // 循环足够多份保证永远有内容
          const loopedPool = pool.length > 0 ? Array(12).fill(null).flatMap(() => pool) : []

          return (
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
              <div style={{
                position: 'absolute',
                top: '50%', left: -3, right: -3,
                height: itemH,
                transform: 'translateY(-50%)',
                borderTop: '2px solid #FFD700',
                borderBottom: '2px solid #FFD700',
                background: 'rgba(255,215,0,0.08)',
                zIndex: 2,
                pointerEvents: 'none',
                boxShadow: 'inset 0 0 12px rgba(255,215,0,0.15)',
              }} />

              <div style={{
                position: 'absolute',
                top: -(itemH * CENTER_IDX),
                left: 0, right: 0,
                transform: `translateY(${-displayOffset * itemH}px)`,
              }}>
                {loopedPool.map((food, i) => (
                  <div key={i} style={{
                    height: itemH,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 28,
                  }}>
                    {food.emoji}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

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

      <div style={{ minHeight: 130, marginTop: 16 }}>
        {result && !spinning && (
          <div style={{
            padding: '12px 20px',
            background: isJackpot ? '#FFF3E0' : '#FFF9E6',
            borderRadius: 16,
            textAlign: 'center',
            maxWidth: 280,
            margin: '0 auto',
            border: isJackpot ? '2px solid #FFB347' : 'none',
          }}>
            {isJackpot && <div style={{ fontSize: 24, marginBottom: 4 }}>✨🎉✨</div>}
            <div style={{ fontSize: 13, color: '#999', marginBottom: 4 }}>
              {isJackpot ? '🎊 三连中！天意！' : '泡芙觉得中间这个最适合你~'}
            </div>
            <div style={{ fontSize: 28 }}>{result.emoji}</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{result.name}</div>
            <div style={{ fontSize: 12, color: '#666', lineHeight: 1.5 }}>{result.comment}</div>
          </div>
        )}
      </div>
    </div>
  )
}
