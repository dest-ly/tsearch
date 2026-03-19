import styles from '../styles/Sidebar.module.css'

export function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <button type="button">
                Transactions
            </button>
            <button type="button">
                Settings
            </button>
            <button type="button">
                User Management
            </button>
            <button type="button">
                ATM Management
            </button>
            <button type="button">
                My Account
            </button>
        </div>
    )
}