import styles from './App.module.css'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'

function App() {
  return (
    
    /* Page Wrapper */
    <div className={styles.page}>
      {/* Header */}
      <Header />
      {/* Sidebar + Main Workspace (10-90 split) */}
      <div className={styles.workspace}>
        <Sidebar />

        {/* Main Workspace */}
        <div className={styles.mainworkspace}>
          <h2>Main Workspace</h2>
        </div>
      </div>
      
    </div>

  )
}

export default App
