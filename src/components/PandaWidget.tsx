import { useState, useEffect, useRef } from 'react'
import type { PandaMood } from '../types'
import './PandaWidget.css'

interface Props {
  mood: PandaMood
  outfitColor?: string | null
}

export function PandaWidget({ mood, outfitColor }: Props) {
  const [petting, setPetting] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // 陀螺仪倾斜
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma: 左右 -45~45, beta: 前后 -45~45
        const x = Math.max(-15, Math.min(15, (e.gamma || 0) * 0.4))
        const y = Math.max(-15, Math.min(15, ((e.beta || 0) - 45) * 0.3))
        setTilt({ x, y })
      }
    }
    window.addEventListener('deviceorientation', handleOrientation)
    return () => window.removeEventListener('deviceorientation', handleOrientation)
  }, [])

  // 桌面鼠标视差
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const x = ((e.clientX - cx) / rect.width) * 16
    const y = ((e.clientY - cy) / rect.height) * 12
    setTilt({ x, y })
  }
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  const handlePet = () => {
    if (petting) return
    setPetting(true)
    setTimeout(() => setPetting(false), 800)
  }

  return (
    <div
      ref={containerRef}
      className={`panda-container${petting ? ' petting' : ''}`}
      data-mood={mood}
      style={{ '--outfit-color': outfitColor || undefined } as React.CSSProperties}
      onPointerDown={handlePet}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      aria-label="抚摸泡芙"
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
          transform: `rotateY(${tilt.x}deg) rotateX(${-tilt.y}deg)`,
          transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.6s ease-out' : 'none',
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
