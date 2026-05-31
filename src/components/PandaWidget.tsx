import type { PandaMood } from '../types'
import './PandaWidget.css'

interface Props {
  mood: PandaMood
  outfitColor?: string | null
}

export function PandaWidget({ mood, outfitColor }: Props) {
  return (
    <div className="panda-container" data-mood={mood} style={{ '--outfit-color': outfitColor || undefined } as React.CSSProperties}>
      {/* 漂浮特效 */}
      {mood === 'happy' && (
        <div className="panda-sparkles">
          <span className="panda-sparkle">✨</span>
          <span className="panda-sparkle">💕</span>
          <span className="panda-sparkle">🌟</span>
        </div>
      )}

      <div className="panda-scene">
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

            {/* 衣服 */}
            {outfitColor && (
              <div className="panda-outfit">
                <div className="panda-bow">
                  <div className="panda-bow-dot" />
                </div>
              </div>
            )}

            {/* 前爪 */}
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
