import { useState } from 'react'
import { FoodWheel } from './FoodWheel'
import { FoodSlots } from './FoodSlots'
import { FoodFortune } from './FoodFortune'
import type { FoodItem } from '../data/foods'

type Mode = 'wheel' | 'slots' | 'fortune'

const TABS: { key: Mode; emoji: string; label: string }[] = [
  { key: 'wheel', emoji: '🎡', label: '大转盘' },
  { key: 'slots', emoji: '🎰', label: '老虎机' },
  { key: 'fortune', emoji: '🎋', label: '抽签筒' },
]

interface Props {
  onClose: () => void
}

export function FoodPicker({ onClose }: Props) {
  const [mode, setMode] = useState<Mode>('wheel')
  const [resultFood, setResultFood] = useState<FoodItem | null>(null)

  const handleResult = (food: FoodItem) => {
    setResultFood(food)
  }

  // Prevent body scroll when open
  const handleOverlayTouch = (e: React.TouchEvent) => {
    e.preventDefault()
  }

  return (
    <>
      {/* 遮罩 */}
      <div
        onClick={onClose}
        onTouchMove={handleOverlayTouch}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          zIndex: 99,
        }}
      />

      {/* 弹窗 */}
      <div
        className="slide-up"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: '#fff',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* 顶部 */}
        <div style={{
          flexShrink: 0,
          padding: 'calc(12px + env(safe-area-inset-top)) 16px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>🍜 今天吃什么</h3>
          <button
            onClick={onClose}
            style={{
              width: 32, height: 32,
              border: 'none',
              background: 'var(--color-border)',
              borderRadius: '50%',
              fontSize: 16,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        {/* Tab 切换 */}
        <div style={{
          flexShrink: 0,
          display: 'flex',
          gap: 4,
          padding: '8px 16px 0',
          borderBottom: '1px solid var(--color-border)',
        }}>
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => { setMode(tab.key); setResultFood(null) }}
              style={{
                flex: 1,
                padding: '10px 0',
                border: 'none',
                background: mode === tab.key ? 'var(--phase-color, #FF6B6B)' : 'transparent',
                color: mode === tab.key ? '#fff' : 'var(--color-text)',
                borderRadius: '10px 10px 0 0',
                fontSize: 14,
                fontWeight: mode === tab.key ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>

        {/* 内容区 */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          padding: '12px 0',
          minHeight: 0,
        }}>
          {mode === 'wheel' && <FoodWheel onResult={handleResult} />}
          {mode === 'slots' && <FoodSlots onResult={handleResult} />}
          {mode === 'fortune' && <FoodFortune onResult={handleResult} />}
        </div>

        {/* 底部提示 */}
        {resultFood && (
          <div style={{
            flexShrink: 0,
            padding: '10px 20px calc(10px + env(safe-area-inset-bottom))',
            textAlign: 'center',
            fontSize: 12,
            color: 'var(--color-text-light)',
            borderTop: '1px solid var(--color-border)',
          }}>
            💡 不满意？切换到其他模式再试试~
          </div>
        )}
      </div>
    </>
  )
}
