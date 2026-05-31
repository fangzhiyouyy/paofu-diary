import { useState, useRef, useCallback } from 'react'
import type { PandaMood } from '../types'
import './PandaWidget.css'

interface Props {
  mood: PandaMood
  outfitColor?: string | null
}

export function PandaWidget({ mood, outfitColor }: Props) {
  const [petting, setPetting] = useState(false)
  const [rotateY, setRotateY] = useState(0)
  const [rotateX, setRotateX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const lastX = useRef(0)
  const lastY = useRef(0)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setDragging(true)
    lastX.current = e.clientX
    lastY.current = e.clientY
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
    // 触摸时不触发抚摸
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return
    const dx = e.clientX - lastX.current
    const dy = e.clientY - lastY.current
    setRotateY(prev => Math.max(-40, Math.min(40, prev + dx * 0.5)))
    setRotateX(prev => Math.max(-25, Math.min(25, prev - dy * 0.4)))
    lastX.current = e.clientX
    lastY.current = e.clientY
  }, [dragging])

  const handlePointerUp = useCallback(() => {
    setDragging(false)
    // 如果基本没移动，视为点击（抚摸）
    if (Math.abs(rotateY) < 3 && Math.abs(rotateX) < 3) {
      triggerPet()
    }
    setRotateY(0)
    setRotateX(0)
  }, [rotateY, rotateX])

  const triggerPet = () => {
    if (petting) return
    setPetting(true)
    setTimeout(() => setPetting(false), 800)
  }

  return (
    <div
      className={`panda-container${petting ? ' petting' : ''}`}
      data-mood={mood}
      data-dragging={dragging ? '' : undefined}
      style={{ '--outfit-color': outfitColor || undefined } as React.CSSProperties}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      role="button"
      aria-label="拖拽旋转泡芙"
      tabIndex={0}
    >
      {/* 漂浮特效 */}
      {mood === 'happy' && (
        <div className="panda-sparkles">
          <span className="panda-sparkle">✨</span>
          <span className="panda-sparkle">💕</span>
          <span className="panda-sparkle">🌟</span>
        </div>
      )}

      {/* 抚摸特效 */}
      {petting && (
        <div className="pet-effect">
          <span className="pet-heart">💕</span>
          <span className="pet-heart delay1">💕</span>
          <span className="pet-heart delay2">💕</span>
        </div>
      )}

      <div
        className="panda-scene"
        style={{
          transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
          transition: dragging ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* 尾巴 */}
        <div className="panda-tail">
          <div className="panda-tail-base">
            <div className="panda-tail-ring" />
            <div className="panda-tail-ring" />
            <div className="panda-tail-ring" />
          </div>
        </div>

        {/* 身体 */}
        <div className="panda-body">
          <div className="panda-body-main">
            <div className="panda-belly" />
            {outfitColor && (
              <div className="panda-outfit">
                <div className="panda-bow">
                  <div className="panda-bow-dot" />
                </div>
              </div>
            )}
            <div className="panda-paw left" />
            <div className="panda-paw right" />
          </div>

          {/* 头部 */}
          <div className="panda-head">
            <div className="panda-ear left" />
            <div className="panda-ear right" />
            <div className="panda-face">
              <div className="panda-face-white" />
              <div className="panda-eye-patch left" />
              <div className="panda-eye-patch right" />
              <div className="panda-eye left" />
              <div className="panda-eye right" />
              <div className="panda-blush left" />
              <div className="panda-blush right" />
              <div className="panda-nose" />
              <div className="panda-mouth">
                <div className="panda-mouth-line" />
              </div>
            </div>
          </div>
        </div>

        <div className="panda-ground" />
      </div>
    </div>
  )
}
