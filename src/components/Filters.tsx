import styles from '../styles/Filters.module.css'

export function Filters() {
    return (
        <div className={styles.transactions}>
            <div className={styles.header}>
                <div>   
                    <h3>All Transactions</h3>
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
                    <label htmlFor="atm">ATM ID</label>
                    <select name="atm" id="atm">
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                </div>

                <div className={styles.parameter}>
                    <label htmlFor="pan">Customer PAN Number</label>
                    <input type="search" id="pan" name="pan" />
                </div>

                <div className={styles.parameter}>
                    <label htmlFor="emv">EMV chip AID</label>
                    <input type="search" id="emv" name="emv" />
                </div>

                <div className={styles.parameter}>
                    <label htmlFor="tsn">Transaction Serial Number</label>
                    <input type="search" id="tsn" name="tsn" />
                </div>
            </div>
        </div>
    )
}