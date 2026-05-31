import { useUIStore } from '../stores/uiStore'

const TABS = [
  { key: 'daily' as const, label: '日记', emoji: '📅' },
  { key: 'monthly' as const, label: '月历', emoji: '📆' },
  { key: 'settings' as const, label: '设置', emoji: '⚙️' },
]

export function TabBar() {
  const { activeTab, setTab, themeColor } = useUIStore()

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '8px 0 calc(8px + var(--safe-bottom))',
      background: '#fff',
      borderTop: '1px solid var(--color-border)',
      flexShrink: 0,
    }}>
      {TABS.map(tab => {
        const isActive = activeTab === tab.key
        return (
          <button
            key={tab.key}
            onClick={() => setTab(tab.key)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              padding: '4px 20px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: isActive ? themeColor : 'var(--color-text-light)',
              fontSize: 12,
              fontWeight: isActive ? 600 : 400,
              transition: 'color 0.2s',
              WebkitTapHighlightColor: 'transparent',
              minWidth: 64,
              minHeight: 44,
            }}
          >
            <span style={{ fontSize: 22 }}>{tab.emoji}</span>
            <span>{tab.label}</span>
            {isActive && (
              <div style={{
                width: 20, height: 3,
                background: themeColor,
                borderRadius: 'var(--radius-full)',
                marginTop: 2,
              }} />
            )}
          </button>
        )
      })}
    </nav>
  )
}
