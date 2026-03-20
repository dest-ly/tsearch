import { useEffect, useState } from 'react'

// styles
import styles from './App.module.css'

// components
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Transactions } from './components/Transactions'
import { Filters } from './components/Filters'
import { fetchAtmList, type AtmListItem } from './util/atmList'

function App() {
  const [atmOptions, setAtmOptions] = useState<AtmListItem[]>([])
  const [isLoadingAtmOptions, setIsLoadingAtmOptions] = useState(true)
  const [atmOptionsError, setAtmOptionsError] = useState<string | null>(null)

  useEffect(() => {
    const loadAtmOptions = async () => {
      setIsLoadingAtmOptions(true)
      setAtmOptionsError(null)

      try {
        const data = await fetchAtmList()
        setAtmOptions(data)
      } catch {
        setAtmOptions([])
        setAtmOptionsError('Unable to load ATM IDs')
      }

      setIsLoadingAtmOptions(false)
    }

    void loadAtmOptions()
  }, [])

  return (
    
    /* Page Wrapper */
    <div className={styles.page}>
      {/* Header */}
      <Header />
      {/* Sidebar + Main Workspace (10-90 split) */}
      <div className={styles.body}>
        <Sidebar />

        {/* Main Workspace */}
        <div className={styles.workspace}>
          <Filters
            atmOptions={atmOptions}
            isLoadingAtmOptions={isLoadingAtmOptions}
            atmOptionsError={atmOptionsError}
          />
          <Transactions />
        </div>
      </div>
    </div>
  )
}

export default App
