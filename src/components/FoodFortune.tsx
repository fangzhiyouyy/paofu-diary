import { useState, useCallback } from 'react'
import type { FoodItem } from '../data/foods'
import { getRandomFoodByCategory } from '../data/foods'
import './PandaWidget.css'

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
    setTimeout(() => setPhase('flying'), 1400)
    setTimeout(() => {
      setPhase('result')
      onResult(picked)
    }, 2000)
  }, [phase, onResult])

  const reset = () => {
    setFood(null)
    setPhase('idle')
  }

  const isShaking = phase === 'shaking'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4px 0' }}>
      <style>{`
        @keyframes shakeCylinder {
          0%,100% { transform: rotate(0deg); }
          15% { transform: rotate(-10deg); }
          30% { transform: rotate(10deg); }
          45% { transform: rotate(-8deg); }
          60% { transform: rotate(8deg); }
          75% { transform: rotate(-4deg); }
          90% { transform: rotate(4deg); }
        }
        @keyframes pandaShakeX {
          0%,100% { transform: translateX(0); }
          15% { transform: translateX(-4px); }
          30% { transform: translateX(4px); }
          45% { transform: translateX(-3px); }
          60% { transform: translateX(3px); }
          75% { transform: translateX(-1px); }
          90% { transform: translateX(1px); }
        }
        @keyframes stickFlyOut {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
          40% { transform: translate(30px, -100px) rotate(200deg) scale(1); opacity: 1; }
          70% { transform: translate(70px, -60px) rotate(400deg) scale(0.9); opacity: 1; }
          100% { transform: translate(110px, 40px) rotate(600deg) scale(0); opacity: 0; }
        }
        @keyframes cardAppear {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .fortune-scene {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 24px;
          height: 195px;
          padding: 0 20px;
          position: relative;
        }
        .fortune-panda-wrap {
          flex-shrink: 0;
        }
        .fortune-panda-wrap .panda-container {
          margin-top: 0;
          padding: 0;
        }
        .fortune-panda-wrap .panda-scene {
          width: 120px;
          padding: 0;
        }
        .fortune-cylinder {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        }
        .fortune-cylinder-body {
          width: 38px;
          height: 75px;
          background: linear-gradient(180deg, #D4A76A 0%, #C49A5C 25%, #B8860B 50%, #A07608 100%);
          border-radius: 6px 6px 4px 4px;
          position: relative;
          box-shadow: inset 0 2px 6px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1);
          border: 2px solid #8B6914;
        }
        .fortune-stick-fly {
          position: absolute;
          bottom: 55px;
          left: 175px;
          width: 10px;
          height: 40px;
          background: linear-gradient(180deg, #F5E6D3 0%, #EDE0CC 100%);
          border-radius: 3px 3px 0 0;
          border: 1px solid #D4A76A;
          z-index: 5;
          animation: stickFlyOut 0.7s ease-in forwards;
        }
      `}</style>

      {/* 场景 */}
      <div className="fortune-scene">
        {/* 泡芙（复用 PandaWidget CSS，缩至 55%） */}
        <div
          className="fortune-panda-wrap"
          style={{
            animation: isShaking ? 'pandaShakeX 0.12s ease-in-out 12' : 'none',
          }}
        >
          <div className="panda-container" data-mood="neutral">
            <div className="panda-scene" style={{ transform: 'scale(0.55)', transformOrigin: 'bottom center' }}>
              <div className="panda-tail">
                <div className="panda-tail-base">
                  <div className="panda-tail-ring" />
                  <div className="panda-tail-ring" />
                  <div className="panda-tail-ring" />
                </div>
              </div>
              <div className="panda-head">
                <div className="panda-ear left" />
                <div className="panda-ear right" />
                <div className="panda-face">
                  <div className="panda-face-white" />
                  <div className="panda-eye-patch left" />
                  <div className="panda-eye-patch right" />
                  <div className="panda-eye left" />
                  <div className="panda-eye right" />
                  <div className="panda-eyebrow left" />
                  <div className="panda-eyebrow right" />
                  <div className="panda-blush left" />
                  <div className="panda-blush right" />
                  <div className="panda-nose" />
                  <div className="panda-mouth">
                    <div className="panda-mouth-line" />
                  </div>
                </div>
              </div>
              <div className="panda-body">
                <div className="panda-body-main">
                  <div className="panda-belly" />
                  <div className="panda-paw left" />
                  <div className="panda-paw right" />
                </div>
              </div>
              <div className="panda-ground">
                <span className="paw-print left">🐾</span>
                <span className="paw-print right">🐾</span>
              </div>
            </div>
          </div>
        </div>

        {/* 签筒 */}
        <div
          className="fortune-cylinder"
          style={{
            animation: isShaking ? 'shakeCylinder 0.12s ease-in-out 12' : 'none',
          }}
        >
          <div className="fortune-cylinder-body">
            {phase !== 'flying' && phase !== 'result' && (
              <>
                <div style={{
                  position: 'absolute', top: 5, left: 8,
                  width: 5, height: 22, background: '#F5E6D3',
                  borderRadius: '2px 2px 0 0', border: '1px solid #D4A76A',
                }} />
                <div style={{
                  position: 'absolute', top: 5, left: 16,
                  width: 5, height: 20, background: '#EDE0CC',
                  borderRadius: '2px 2px 0 0', border: '1px solid #D4A76A',
                }} />
                <div style={{
                  position: 'absolute', top: 5, left: 24,
                  width: 5, height: 21, background: '#F5E6D3',
                  borderRadius: '2px 2px 0 0', border: '1px solid #D4A76A',
                }} />
              </>
            )}
            <div style={{
              position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)',
              fontSize: 8, color: '#6B4E0A', fontWeight: 700, whiteSpace: 'nowrap',
            }}>
              签筒
            </div>
          </div>
        </div>

        {/* 飞出的签条 */}
        {phase === 'flying' && <div className="fortune-stick-fly" />}
      </div>

      {/* 按钮 */}
      <button
        onClick={phase === 'idle' ? draw : undefined}
        disabled={phase !== 'idle'}
        style={{
          padding: '11px 38px',
          border: 'none',
          borderRadius: 24,
          background: phase !== 'idle' ? '#ccc' : 'var(--phase-color, #A78BFA)',
          color: '#fff',
          fontSize: 16,
          fontWeight: 600,
          cursor: phase !== 'idle' ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
          marginTop: 4,
        }}
      >
        {phase === 'idle' ? '🎋 摇一摇签筒' : phase === 'shaking' ? '🎋 摇晃中...' : phase === 'flying' ? '🎋 签飞出来了！' : '🎋 揭晓结果'}
      </button>

      {/* 结果卡片 */}
      {phase === 'result' && food && (
        <div style={{
          marginTop: 14,
          padding: '16px 22px',
          background: 'linear-gradient(135deg, #FFF9E6 0%, #FFF3D6 100%)',
          borderRadius: 16,
          textAlign: 'center',
          maxWidth: 280,
          border: '2px solid #D4A76A',
          boxShadow: '0 4px 16px rgba(139,105,20,0.12)',
          animation: 'cardAppear 0.4s ease-out',
        }}>
          <div style={{ fontSize: 12, color: '#B8860B', marginBottom: 6 }}>🎋 签文</div>
          <div style={{ fontSize: 32, marginBottom: 4 }}>{food.emoji}</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#8B6914', marginBottom: 6 }}>{food.name}</div>
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
