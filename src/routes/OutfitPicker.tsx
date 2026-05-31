import { useState } from 'react'
import { useDailyStore } from '../stores/dailyStore'
import { ColorGrid } from '../components/ColorGrid'
import { PandaWidget } from '../components/PandaWidget'
import { OUTFIT_COLORS } from '../types'

export function OutfitPicker() {
  const { record, setOutfitColor } = useDailyStore()
  const [previewColor, setPreviewColor] = useState<string | null>(record?.outfit_color || null)

  const handleSelect = async (hex: string, name: string) => {
    setPreviewColor(hex)
    await setOutfitColor(hex, name)
  }

  return (
    <div style={{
      flex: 1,
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      padding: 'calc(16px + var(--safe-top)) 16px calc(16px + var(--safe-bottom))',
    }}>
      <div style={{ fontSize: 18, fontWeight: 700, textAlign: 'center', marginBottom: 4 }}>
        👗 今日穿搭
      </div>
      <div style={{ fontSize: 13, color: 'var(--color-text-light)', textAlign: 'center', marginBottom: 16 }}>
        她穿什么颜色，泡芙就穿什么颜色~
      </div>

      {/* 预览 */}
      <div style={{
        padding: 12,
        background: '#fff',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: 16,
      }}>
        <PandaWidget
          mood={record?.panda_mood || 'happy'}
          outfitColor={previewColor}
        />
        {previewColor && (
          <div style={{
            textAlign: 'center',
            fontSize: 13,
            color: 'var(--color-text-light)',
            padding: '0 0 8px',
          }}>
            泡芙穿上了{' '}
            <span style={{ fontWeight: 600, color: previewColor }}>
              {OUTFIT_COLORS.find(c => c.hex === previewColor)?.name || '自定义色'}
            </span>{' '}
            小裙子~
          </div>
        )}
        {!previewColor && (
          <div style={{
            textAlign: 'center',
            fontSize: 13,
            color: 'var(--color-text-light)',
            padding: '0 0 8px',
          }}>
            今天还没选颜色，泡芙穿着它的经典锈红色~
          </div>
        )}
      </div>

      {/* 选择颜色 */}
      <div style={{
        padding: 16,
        background: '#fff',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: 16,
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
          🎨 选择颜色
        </div>
        <ColorGrid selected={previewColor} onSelect={handleSelect} />
      </div>

      {/* 自定义颜色 */}
      <div style={{
        padding: 16,
        background: '#fff',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
          🎨 自定义颜色
        </div>
        <input
          type="color"
          value={previewColor || '#C75B39'}
          onChange={e => {
            const hex = e.target.value
            setPreviewColor(hex)
          }}
          onBlur={() => {
            if (previewColor) {
              setOutfitColor(previewColor, '自定义')
            }
          }}
          style={{
            width: '100%',
            height: 44,
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
        />
        <div style={{
          textAlign: 'center',
          fontSize: 12,
          color: 'var(--color-text-light)',
          marginTop: 8,
        }}>
          选好后会自动保存~
        </div>
      </div>
    </div>
  )
}
