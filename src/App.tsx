// styles
import styles from './App.module.css'

// components
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Transactions } from './components/Transactions'
import { Filters } from './components/Filters'

function App() {
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
          <Filters />
          <Transactions />
        </div>
      </div>
    </div>
  )
}

export default App
