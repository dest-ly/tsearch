import styles from '../styles/Filters.module.css'

export function Filters() {
    return (
        <div className={styles.transactions}>
            <div className={styles.header}>
                <div>   
                    <h3>Upper Details</h3>
                </div>

                <div className={styles.buttongroup}>   
                    <button type="button" className={styles.button}>
                        Print
                    </button>
                    <button type="button" className={styles.button}>
                        Export
                    </button>
                </div>
                
            </div>
            <div className={styles.filters}>
                <div className={styles.parameter}>
                    <label htmlFor="date">Date From</label>
                    <input type="date" id="date" name="date" />
                </div>
                
                <div className={styles.parameter}>
                    <label htmlFor="date">Date To</label>
                    <input type="date" id="date" name="date" />
                </div>

                <div className={styles.parameter}>
                    <label htmlFor="date">ATM ID</label>
                    <input type="number" id="date" name="date" />
                </div>

                <div className={styles.parameter}>
                    <label htmlFor="date">Customer PAN Number</label>
                    <input type="search" id="date" name="date" />
                </div>

                <div className={styles.parameter}>
                    <label htmlFor="date">EMV chip AID</label>
                    <input type="search" id="date" name="date" />
                </div>

                <div className={styles.parameter}>
                    <label htmlFor="date">Transaction Serial Number</label>
                    <input type="search" id="date" name="date" />
                </div>
            </div>
        </div>
    )
}