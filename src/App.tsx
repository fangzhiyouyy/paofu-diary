import { useEffect } from 'react'
import { useUIStore } from './stores/uiStore'
import { useCycleStore } from './stores/cycleStore'
import { TabBar } from './components/TabBar'
import { DailyView } from './routes/DailyView'
import { MonthlyView } from './routes/MonthlyView'
import { CycleSetup } from './routes/CycleSetup'
import { OutfitPicker } from './routes/OutfitPicker'

function App() {
  const { activeTab, themeColor, themeBgColor } = useUIStore()
  const { currentPhase, load } = useCycleStore()

  useEffect(() => {
    load()
  }, [load])

  // CSS 变量主题切换
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
        {activeTab === 'daily' && <DailyView />}
        {activeTab === 'monthly' && <MonthlyView />}
        {activeTab === 'settings' && (
          <div style={{ flex: 1, overflow: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <OutfitPicker />
            <CycleSetup />
          </div>
        )}
      </main>
      <TabBar />
    </>
  )
}

export default App
