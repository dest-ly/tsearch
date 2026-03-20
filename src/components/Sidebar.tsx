import { useState } from 'react';
import styles from '../styles/Sidebar.module.css'
import { UnavailableDialog } from './UnavailableDialog.tsx'

export function Sidebar() {
    // Dialog for non-functioning buttons
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className={styles.sidebar}>
            <button type="button" className={styles.button}>
                Transactions
            </button>
            <button onClick={() => setIsOpen(true)} type="button" className={styles.button}>
                Settings
            </button>
            <button onClick={() => setIsOpen(true)} type="button" className={styles.button}>
                User Management
            </button>
            <button onClick={() => setIsOpen(true)} type="button" className={styles.button}>
                ATM Management
            </button>
            <button onClick={() => setIsOpen(true)} type="button" className={styles.button}>
                My Account
            </button>

            <UnavailableDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    )
}