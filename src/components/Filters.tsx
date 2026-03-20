import styles from '../styles/Filters.module.css'
import type { AtmListItem } from '../util/atmList'

type FiltersProps = {
    atmOptions: AtmListItem[]
    isLoadingAtmOptions: boolean
    atmOptionsError: string | null
}

export function Filters({ atmOptions, isLoadingAtmOptions, atmOptionsError }: FiltersProps) {
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

                {/* ATM ID dropdown, dynamically generated */}
                <div className={styles.parameter}>
                    <label htmlFor="atm">ATM ID</label>
                    <select name="atm" id="atm" disabled={isLoadingAtmOptions || atmOptionsError !== null}>
                        <option value="">
                            {isLoadingAtmOptions
                                ? 'Loading ATM IDs...'
                                : atmOptionsError ?? 'Select an ATM ID'}
                        </option>
                        {/* JSON Schema of the response payload */}
                        {/*
                        [
                            {
                                "country": "string",
                                "id": 0,
                                "lt": 0,
                                "name": "string",
                                "ts": 0
                            }
                        ]        
                        */}
                        {atmOptions.map((atm) => (
                            <option key={atm.name} value={atm.name}>
                                {atm.name}
                            </option>
                        ))}
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