import { useState, useCallback } from 'react'
import type { FoodItem } from '../data/foods'
import { getRandomFoodByCategory } from '../data/foods'

interface Props {
  onResult: (food: FoodItem) => void
}

export function FoodFortune({ onResult }: Props) {
  const [phase, setPhase] = useState<'idle' | 'shaking' | 'flying' | 'result'>('idle')
  const [food, setFood] = useState<FoodItem | null>(null)

  const draw = useCallback(() => {
    if (phase !== 'idle') return
    const picked = getRandomFoodByCategory()
    setFood(picked)
    setPhase('shaking')

    // shake -> fly -> result
    setTimeout(() => setPhase('flying'), 1200)
    setTimeout(() => {
      setPhase('result')
      onResult(picked)
    }, 1800)
  }, [phase, onResult])

  const reset = () => {
    setFood(null)
    setPhase('idle')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0' }}>
      <style>{`
        @keyframes shakeCylinder {
          0%,100% { transform: rotate(0deg); }
          15% { transform: rotate(-8deg); }
          30% { transform: rotate(8deg); }
          45% { transform: rotate(-6deg); }
          60% { transform: rotate(6deg); }
          75% { transform: rotate(-3deg); }
          90% { transform: rotate(3deg); }
        }
        @keyframes pandaShake {
          0%,100% { transform: translateX(0); }
          15% { transform: translateX(-3px); }
          30% { transform: translateX(3px); }
          45% { transform: translateX(-2px); }
          60% { transform: translateX(2px); }
          75% { transform: translateX(-1px); }
          90% { transform: translateX(1px); }
        }
        @keyframes stickFly {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          30% { transform: translate(40px, -80px) rotate(180deg); opacity: 1; }
          60% { transform: translate(80px, -40px) rotate(360deg); opacity: 1; }
          100% { transform: translate(120px, 60px) rotate(540deg); opacity: 0; }
        }
      `}</style>

      {/* 场景区域 */}
      <div style={{
        position: 'relative',
        width: 260,
        height: 200,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 16,
        marginBottom: 8,
      }}>
        {/* 泡芙 */}
        <div style={{
          animation: phase === 'shaking' ? 'pandaShake 0.15s ease-in-out 8' : 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          {/* 头部 */}
          <div style={{
            width: 52, height: 46,
            background: 'linear-gradient(180deg, #E8753A 0%, #D46935 60%, #F5E6D3 60%, #F5E6D3 100%)',
            borderRadius: '50% 50% 45% 45%',
            position: 'relative',
          }}>
            {/* 耳朵 */}
            <div style={{ position: 'absolute', top: -6, left: 2, width: 14, height: 12, background: '#C45A2A', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', top: -6, right: 2, width: 14, height: 12, background: '#C45A2A', borderRadius: '50%' }} />
            {/* 眼睛 */}
            <div style={{ position: 'absolute', top: 16, left: 10, width: 7, height: 8, background: '#333', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', top: 16, right: 10, width: 7, height: 8, background: '#333', borderRadius: '50%' }} />
            {/* 鼻子 */}
            <div style={{ position: 'absolute', top: 22, left: '50%', transform: 'translateX(-50%)', width: 6, height: 5, background: '#333', borderRadius: '50%' }} />
          </div>
          {/* 身体 */}
          <div style={{
            width: 40, height: 36,
            background: 'linear-gradient(180deg, #E8753A 0%, #D46935 100%)',
            borderRadius: '40% 40% 30% 30%',
            marginTop: -4,
          }} />
        </div>

        {/* 签筒 */}
        <div style={{
          animation: phase === 'shaking' ? 'shakeCylinder 0.15s ease-in-out 8' : 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <div style={{
            width: 48,
            height: 80,
            background: 'linear-gradient(180deg, #D4A76A 0%, #C49A5C 30%, #B8860B 100%)',
            borderRadius: '8px 8px 4px 4px',
            position: 'relative',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.15)',
            border: '2px solid #B8860B',
          }}>
            {/* 签筒内的签条 */}
            {phase !== 'flying' && phase !== 'result' && (
              <>
                <div style={{
                  position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
                  width: 6, height: 24, background: '#F5E6D3', borderRadius: '2px 2px 0 0',
                  border: '1px solid #D4A76A',
                }} />
                <div style={{
                  position: 'absolute', top: 6, left: 14, transform: 'translateX(-50%)',
                  width: 5, height: 20, background: '#EDE0CC', borderRadius: '2px 2px 0 0',
                  border: '1px solid #D4A76A',
                }} />
                <div style={{
                  position: 'absolute', top: 6, left: 34, transform: 'translateX(-50%)',
                  width: 5, height: 22, background: '#F5E6D3', borderRadius: '2px 2px 0 0',
                  border: '1px solid #D4A76A',
                }} />
              </>
            )}
            {/* 签筒标签 */}
            <div style={{
              position: 'absolute',
              bottom: 4,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 9,
              color: '#8B6914',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}>
              签筒
            </div>
          </div>
        </div>

        {/* 飞出的签条 */}
        {(phase === 'flying' || phase === 'result') && food && (
          <div style={{
            position: 'absolute',
            bottom: 70,
            left: 140,
            width: 10,
            height: 40,
            background: 'linear-gradient(180deg, #F5E6D3 0%, #EDE0CC 100%)',
            borderRadius: '3px 3px 0 0',
            border: '1px solid #D4A76A',
            animation: phase === 'flying' ? 'stickFly 0.6s ease-in-out forwards' : 'none',
            opacity: phase === 'result' ? 0 : 1,
            ...(phase === 'result' ? { display: 'none' } : {}),
          }} />
        )}
      </div>

      {/* 按钮 */}
      <button
        onClick={phase === 'idle' ? draw : undefined}
        disabled={phase !== 'idle'}
        style={{
          padding: '12px 40px',
          border: 'none',
          borderRadius: 24,
          background: phase !== 'idle' ? '#ccc' : 'var(--phase-color, #A78BFA)',
          color: '#fff',
          fontSize: 16,
          fontWeight: 600,
          cursor: phase !== 'idle' ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
        }}
      >
        {phase === 'idle' ? '🎋 摇一摇签筒' : phase === 'shaking' ? '🎋 摇晃中...' : phase === 'flying' ? '🎋 签飞出来了！' : '🎋 揭晓结果'}
      </button>

      {/* 结果卡片 */}
      {phase === 'result' && food && (
        <div style={{
          marginTop: 12,
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #FFF9E6 0%, #FFF3D6 100%)',
          borderRadius: 16,
          textAlign: 'center',
          maxWidth: 280,
          border: '2px solid #D4A76A',
          boxShadow: '0 4px 16px rgba(139,105,20,0.12)',
        }}>
          <div style={{ fontSize: 12, color: '#B8860B', marginBottom: 6 }}>
            🎋 签文
          </div>
          <div style={{ fontSize: 32, marginBottom: 4 }}>{food.emoji}</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#8B6914', marginBottom: 6 }}>
            {food.name}
          </div>
          <div style={{ fontSize: 12, color: '#666', lineHeight: 1.6, fontStyle: 'italic' }}>
            「{food.comment}」
          </div>
          <button
            onClick={reset}
            style={{
              marginTop: 12,
              padding: '6px 20px',
              border: '1.5px solid #D4A76A',
              borderRadius: 16,
              background: '#fff',
              fontSize: 13,
              cursor: 'pointer',
              color: '#8B6914',
            }}
          >
            🎋 再抽一支
          </button>
        </div>
      )}
    </div>
  )
}
