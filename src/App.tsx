import { useEffect } from 'react'
import { useUIStore } from './stores/uiStore'
import { useCycleStore } from './stores/cycleStore'
import { TabBar } from './components/TabBar'
import { DailyView } from './routes/DailyView'
import { MonthlyView } from './routes/MonthlyView'
import { CycleSetup } from './routes/CycleSetup'
import { OutfitPicker } from './routes/OutfitPicker'
import { ChatWidget } from './components/ChatWidget'

function App() {
  const { activeTab, themeColor, themeBgColor } = useUIStore()
  const { currentPhase, load } = useCycleStore()

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    if (currentPhase) {
      document.documentElement.setAttribute('data-phase', currentPhase)
    } else {
      document.documentElement.removeAttribute('data-phase')
    }
    document.documentElement.style.setProperty('--phase-color', themeColor)
    document.documentElement.style.setProperty('--phase-bg', themeBgColor)
  }, [currentPhase, themeColor, themeBgColor])

  return (
    <>
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: 'var(--color-bg)',
      }}>
        <div style={{ display: activeTab === 'daily' ? 'flex' : 'none', flex: 1, flexDirection: 'column', overflow: 'hidden' }}>
          <DailyView />
        </div>
        <div style={{ display: activeTab === 'monthly' ? 'flex' : 'none', flex: 1, flexDirection: 'column', overflow: 'hidden' }}>
          <MonthlyView />
        </div>
        <div style={{ display: activeTab === 'chat' ? 'flex' : 'none', flex: 1, flexDirection: 'column', overflow: 'hidden' }}>
          <ChatWidget />
        </div>
        <div style={{ display: activeTab === 'settings' ? 'flex' : 'none', flex: 1, flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ flex: 1, overflow: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <OutfitPicker />
            <CycleSetup />
          </div>
        </div>
      </main>
      <TabBar />
    </>
  )
}

export default App
