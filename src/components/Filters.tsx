import { useState } from 'react'
import styles from '../styles/Filters.module.css'
import type { AtmListItem } from '../util/atmList'
import type { AidListItem } from '../util/aidList'
import {
    type TransactionFilters,
} from '../util/transactionFilters'
import { UnavailableDialog } from './UnavailableDialog.tsx'

type FiltersProps = {
    filters: TransactionFilters
    onFilterChange: (name: keyof TransactionFilters, value: string) => void
    atmOptions: AtmListItem[]
    isLoadingAtmOptions: boolean
    atmOptionsError: string | null
    aidOptions: AidListItem[]
    isLoadingAidOptions: boolean
    aidOptionsError: string | null
}

export function Filters({
    filters,
    onFilterChange,
    atmOptions,
    isLoadingAtmOptions,
    atmOptionsError,
    aidOptions,
    isLoadingAidOptions,
    aidOptionsError,
}: FiltersProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handlePanChange = (value: string) => {
        onFilterChange('pan', value.replace(/\D/g, ''))
    }

    const handleSerialNumberChange = (value: string) => {
        onFilterChange('serialNumber', value.replace(/\D/g, '').slice(0, 4))
    }

    return (
        <div className={styles.transactions}>
            <div className={styles.header}>
                <div>   
                    <h3>All Transactions</h3>
                </div>

                <div className={styles.buttongroup}>   
                    <button type="button" className={styles.button} onClick={() => setIsDialogOpen(true)}>
                        Print
                    </button>
                    <button type="button" className={styles.button} onClick={() => setIsDialogOpen(true)}>
                        Export
                    </button>
                </div>
                
            </div>
            <div className={styles.filters}>
                <div className={styles.parameter}>
                    <label htmlFor="dateFrom">Date From</label>
                    <input
                        type="date"
                        id="dateFrom"
                        name="dateFrom"
                        value={filters.dateFrom}
                        onChange={(event) => onFilterChange('dateFrom', event.target.value)}
                    />
                </div>
                
                <div className={styles.parameter}>
                    <label htmlFor="dateTo">Date To</label>
                    <input
                        type="date"
                        id="dateTo"
                        name="dateTo"
                        value={filters.dateTo}
                        onChange={(event) => onFilterChange('dateTo', event.target.value)}
                    />
                </div>

                {/* ATM ID dropdown, dynamically generated */}
                <div className={styles.parameter}>
                    <label htmlFor="atmId">ATM ID</label>
                    <select
                        name="atmId"
                        id="atmId"
                        value={filters.atmId}
                        onChange={(event) => onFilterChange('atmId', event.target.value)}
                        disabled={isLoadingAtmOptions || atmOptionsError !== null}
                    >
                        <option value="">
                            {isLoadingAtmOptions
                                ? 'Loading ATM IDs...'
                                : atmOptionsError ?? 'Select an ATM ID'}
                        </option>
                        {/* Display the name but send the ID*/}
                        {atmOptions.map((atm) => (
                            <option key={atm.id} value={String(atm.id)}>
                                {atm.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.parameter}>
                    <label htmlFor="pan">Customer PAN Number</label>
                    <input
                        type="text"
                        id="pan"
                        name="pan"
                        inputMode="numeric"
                        value={filters.pan}
                        onChange={(event) => handlePanChange(event.target.value)}
                    />
                </div>

                {/* EMV AID dropdown, dynamically generated */}
                <div className={styles.parameter}>
                    <label htmlFor="aid">EMV chip AID</label>
                    <select
                        name="aid"
                        id="aid"
                        value={filters.aid}
                        onChange={(event) => onFilterChange('aid', event.target.value)}
                        disabled={isLoadingAidOptions || aidOptionsError !== null}
                    >
                        <option value="">
                            {isLoadingAidOptions
                                ? 'Loading AIDs...'
                                : aidOptionsError ?? 'Select an AID'}
                        </option>
                        {aidOptions.map((aid) => (
                            <option key={aid.id} value={aid.aid}>
                                {aid.aid}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.parameter}>
                    <label htmlFor="serialNumber">Transaction Serial Number</label>
                    <input
                        type="text"
                        id="serialNumber"
                        name="serialNumber"
                        inputMode="numeric"
                        maxLength={4}
                        value={filters.serialNumber}
                        onChange={(event) => handleSerialNumberChange(event.target.value)}
                    />
                </div>
            </div>

            <UnavailableDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
        </div>
    )
}