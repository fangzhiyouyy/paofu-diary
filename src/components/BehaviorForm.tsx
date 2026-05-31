import { useState } from 'react'
import type { BehaviorType } from '../types'
import { BEHAVIOR_META } from '../types'

const SUBTYPES: Record<BehaviorType, { value: string; label: string }[]> = {
  sleep: [
    { value: 'early', label: '🌅 早睡早起' },
    { value: 'normal', label: '🌙 正常作息' },
    { value: 'late', label: '🦉 熬夜了' },
    { value: 'allnighter', label: '💀 通宵' },
    { value: 'nap_short', label: '😴 午睡 (≤30min)' },
    { value: 'nap_long', label: '😴 午睡过长' },
  ],
  meal: [
    { value: 'breakfast', label: '🥐 早餐' },
    { value: 'lunch', label: '🍱 午餐' },
    { value: 'dinner', label: '🍲 晚餐' },
    { value: 'dessert', label: '🍰 甜点' },
    { value: 'snack', label: '🍿 零食' },
    { value: 'feast', label: '🥂 大餐' },
    { value: 'diet', label: '🥗 节食' },
  ],
  work: [
    { value: 'flow', label: '🚀 高效心流' },
    { value: 'normal', label: '💻 普通工作' },
    { value: 'overtime', label: '⏰ 加班' },
    { value: 'meeting', label: '🤝 开会' },
    { value: 'done', label: '✅ 完成任务' },
    { value: 'frustrated', label: '😤 工作受挫' },
  ],
  shopping: [
    { value: 'wishlist', label: '💝 买到心仪' },
    { value: 'daily', label: '🛒 日常购物' },
    { value: 'impulse', label: '😅 冲动消费' },
  ],
  exercise: [
    { value: 'cardio', label: '🏃 跑步/有氧' },
    { value: 'yoga', label: '🧘 瑜伽/拉伸' },
    { value: 'walk', label: '🚶 散步' },
    { value: 'gym', label: '🏋️ 健身' },
  ],
  social: [
    { value: 'bestie', label: '👯 闺蜜聚会' },
    { value: 'date', label: '💑 约会' },
    { value: 'call', label: '📞 视频通话' },
    { value: 'social_duty', label: '😐 社交应酬' },
  ],
  relax: [
    { value: 'bath', label: '🛁 泡澡' },
    { value: 'drama', label: '📺 追剧' },
    { value: 'music', label: '🎵 听音乐' },
    { value: 'craft', label: '🎨 做手工' },
    { value: 'pet', label: '🐱 撸猫/宠物' },
  ],
  grooming: [
    { value: 'makeup', label: '💄 化妆' },
    { value: 'skincare', label: '🧴 护肤' },
    { value: 'hair', label: '💇 做头发' },
  ],
}

interface Props {
  onAdd: (type: BehaviorType, subtype: string, note: string) => void
  onClose: () => void
}

export function BehaviorForm({ onAdd, onClose }: Props) {
  const [step, setStep] = useState<'type' | 'subtype' | 'note'>('type')
  const [behaviorType, setBehaviorType] = useState<BehaviorType | null>(null)
  const [subtype, setSubtype] = useState('')
  const [note, setNote] = useState('')

  const handleTypeSelect = (type: BehaviorType) => {
    setBehaviorType(type)
    setStep('subtype')
  }

  const handleSubtypeSelect = (val: string) => {
    setSubtype(val)
    setStep('note')
  }

  const handleSubmit = () => {
    if (behaviorType && subtype) {
      onAdd(behaviorType, subtype, note)
      onClose()
    }
  }

  const now = new Date()
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

  return (
    <div className="slide-up" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#fff',
      borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
      padding: '20px 20px calc(20px + var(--safe-bottom))',
      boxShadow: '0 -4px 24px rgba(0,0,0,0.1)',
      zIndex: 100,
      maxHeight: '70vh',
      overflow: 'auto',
    }}>
      {/* 头部 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 600 }}>
          {step === 'type' ? '选择行为类型' : step === 'subtype' ? '具体是什么？' : '添加备注'}
        </h3>
        <button
          onClick={onClose}
          style={{
            width: 32, height: 32,
            border: 'none', background: 'var(--color-border)',
            borderRadius: '50%', fontSize: 16, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          ✕
        </button>
      </div>

      {/* 当前时间 */}
      <div style={{
        fontSize: 13,
        color: 'var(--color-text-light)',
        marginBottom: 12,
        padding: '4px 10px',
        background: 'var(--color-bg)',
        borderRadius: 'var(--radius-full)',
        display: 'inline-block',
      }}>
        🕐 {timeStr}
      </div>

      {/* 步骤 1：选择大类 */}
      {step === 'type' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 8,
        }}>
          {(Object.entries(BEHAVIOR_META) as [BehaviorType, { label: string; emoji: string }][]).map(([key, meta]) => (
            <button
              key={key}
              onClick={() => handleTypeSelect(key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 14px',
                border: '1.5px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                background: '#fff',
                cursor: 'pointer',
                fontSize: 15,
                fontWeight: 500,
                transition: 'all 0.15s',
                minHeight: 48,
              }}
            >
              <span style={{ fontSize: 22 }}>{meta.emoji}</span>
              {meta.label}
            </button>
          ))}
        </div>
      )}

      {/* 步骤 2：选择子类型 */}
      {step === 'subtype' && behaviorType && (
        <>
          <button
            onClick={() => setStep('type')}
            style={{
              border: 'none', background: 'none',
              color: 'var(--color-text-light)', cursor: 'pointer',
              fontSize: 14, marginBottom: 12,
            }}
          >
            ← 返回
          </button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {SUBTYPES[behaviorType].map(s => (
              <button
                key={s.value}
                onClick={() => handleSubtypeSelect(s.value)}
                style={{
                  padding: '12px 16px',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  background: '#fff',
                  cursor: 'pointer',
                  fontSize: 15,
                  textAlign: 'left',
                  minHeight: 48,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </>
      )}

      {/* 步骤 3：备注 */}
      {step === 'note' && (
        <>
          <button
            onClick={() => setStep('subtype')}
            style={{
              border: 'none', background: 'none',
              color: 'var(--color-text-light)', cursor: 'pointer',
              fontSize: 14, marginBottom: 12,
            }}
          >
            ← 返回
          </button>
          <input
            type="text"
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="写点什么…（可选）"
            autoFocus
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1.5px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 15,
              fontFamily: 'var(--font-body)',
              outline: 'none',
              marginBottom: 16,
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = 'var(--phase-color, var(--panda-red))'
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '14px',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              background: 'var(--phase-color, var(--panda-red))',
              color: '#fff',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              minHeight: 48,
            }}
          >
            ✅ 记录完成
          </button>
        </>
      )}
    </div>
  )
}
