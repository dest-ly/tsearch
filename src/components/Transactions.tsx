import { useEffect, useRef } from 'react'
import styles from '../styles/Transactions.module.css'
import { fetchTransactions } from '../util/transactions'
import { hasRequiredTransactionFilters, type TransactionFilters } from '../util/transactionFilters'

type TransactionsProps = {
    filters: TransactionFilters
}

export function Transactions({ filters }: TransactionsProps) {
    const lastRequestKeyRef = useRef('')

    useEffect(() => {
        if (!hasRequiredTransactionFilters(filters)) {
            return
        }

        const requestKey = `${filters.atmId}:${filters.dateFrom}:${filters.dateTo}`

        if (lastRequestKeyRef.current === requestKey) {
            return
        }

        lastRequestKeyRef.current = requestKey

        const loadTransactions = async () => {
            try {
                const data = await fetchTransactions(filters)
                console.log('Transaction results', data)
            } catch (error) {
                console.error('Unable to load transactions', error)
            }
        }

        void loadTransactions()
    }, [filters])

    return (
        <div className={styles.transactions}>

        </div>
    )
}