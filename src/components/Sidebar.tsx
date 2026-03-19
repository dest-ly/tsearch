import styles from '../styles/Sidebar.module.css'

export function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <button type="button" className={styles.button}>
                Transactions
            </button>
            <button type="button" className={styles.button}>
                Settings
            </button>
            <button type="button" className={styles.button}>
                User Management
            </button>
            <button type="button" className={styles.button}>
                ATM Management
            </button>
            <button type="button" className={styles.button}>
                My Account
            </button>
        </div>
    )
}