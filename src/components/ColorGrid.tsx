import { OUTFIT_COLORS } from '../types'

interface Props {
  selected: string | null
  onSelect: (hex: string, name: string) => void
}

export function ColorGrid({ selected, onSelect }: Props) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 10,
    }}>
      {OUTFIT_COLORS.map(c => {
        const isSelected = selected === c.hex
        const isLight = ['#F5F5F5', '#E8D5B7', '#FDD835'].includes(c.hex)

        return (
          <button
            key={c.hex}
            onClick={() => onSelect(c.hex, c.name)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '12px 8px 8px',
              border: isSelected ? `3px solid var(--panda-red)` : '2px solid transparent',
              borderRadius: 'var(--radius-md)',
              background: '#fff',
              cursor: 'pointer',
              transition: 'all 0.15s',
              minHeight: 72,
              boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
              outline: 'none',
            }}
          >
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: c.hex,
              border: isLight ? '1px solid var(--color-border)' : 'none',
              boxShadow: isSelected ? `0 0 0 3px ${c.hex}40` : 'none',
            }} />
            <span style={{ fontSize: 11, fontWeight: isSelected ? 600 : 400, color: 'var(--color-text)' }}>
              {c.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}
