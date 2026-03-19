import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Sidebar.module.css'

export function Sidebar() {
    // Dialog for non-functioning buttons
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
        if (!dialog.open) dialog.showModal();
        } else {
        if (dialog.open) dialog.close();
        }
    }, [isOpen]);

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

            {/* Dialog for non-functioning buttons */}
            <dialog 
                ref={dialogRef} 
                onClose={() => setIsOpen(false)}
                style={{ borderRadius: '8px', border: '2px solid #ccc', padding: '1rem', gap: '0.25rem' }}
            >
                <div>
                    <h2>Error</h2>
                    <p>This function is not functional.</p>
                    <button onClick={() => setIsOpen(false)}>Close</button>
                </div>
            </dialog>
        </div>
    )
}