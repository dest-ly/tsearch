import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Transactions.module.css'
import {
    fetchTransactionLog,
    fetchTransactions,
    type TransactionItem,
    type TransactionLogEntry,
} from '../util/transactions'
import { hasRequiredTransactionFilters, type TransactionFilters } from '../util/transactionFilters'

type TransactionsProps = {
    filters: TransactionFilters
}

type TransactionWithLogs = TransactionItem & {
    logEntries: TransactionLogEntry[]
}

type GroupedTransaction = {
    atmId: string
    date: string
    pan: string
    descriptions: TransactionLogEntry[]
    code: string
}

function getTransactionCode(transaction: TransactionItem): string {
    if (transaction.devTime !== undefined) {
        return String(transaction.devTime)
    }

    return transaction.deviceTime ?? ''
}

function getTransactionCodeValue(code: string): number {
    const numericCode = code.replace(/\D/g, '')

    return numericCode ? Number(numericCode) : 0
}

function formatTransactionDateFromCode(code: string): string {
    const value = code.replace(/\D/g, '')

    if (!value) {
        return ''
    }

    if (value.length < 8) {
        return value
    }

    const year = value.slice(0, 4)
    const month = value.slice(4, 6)
    const day = value.slice(6, 8)

    return `${month}/${day}/${year}`
}

function formatTransactionDate(transaction: TransactionItem): string {
    return formatTransactionDateFromCode(getTransactionCode(transaction))
}

function groupTransactionsByPan(transactions: TransactionWithLogs[]): GroupedTransaction[] {
    const groupedTransactions = new Map<string, GroupedTransaction>()

    transactions.forEach((transaction) => {
        const pan = transaction.pan ?? ''
        const descriptions = transaction.logEntries
        const existingTransaction = groupedTransactions.get(pan)
        const nextDate = formatTransactionDate(transaction)
        const nextCode = getTransactionCode(transaction)
        const nextAtmId = transaction.atm?.txt ?? String(transaction.atmid ?? '')

        if (!existingTransaction) {
            groupedTransactions.set(pan, {
                atmId: nextAtmId,
                date: nextDate,
                pan,
                descriptions,
                code: nextCode,
            })

            return
        }

        descriptions.forEach((description) => {
            existingTransaction.descriptions.push(description)
        })

        if (getTransactionCodeValue(nextCode) > getTransactionCodeValue(existingTransaction.code)) {
            existingTransaction.date = nextDate
            existingTransaction.code = nextCode
            existingTransaction.atmId = nextAtmId
        }
    })

    return Array.from(groupedTransactions.values())
}

export function Transactions({ filters }: TransactionsProps) {
    const lastRequestKeyRef = useRef('')
    const [transactions, setTransactions] = useState<TransactionWithLogs[]>([])
    const [isLoadingTransactions, setIsLoadingTransactions] = useState(false)
    const [transactionsError, setTransactionsError] = useState<string | null>(null)
    const hasRequiredFilters = hasRequiredTransactionFilters(filters)
    const groupedTransactions = groupTransactionsByPan(transactions)

    useEffect(() => {
        if (!hasRequiredFilters) {
            lastRequestKeyRef.current = ''
            return
        }

        const requestKey = `${filters.atmId}:${filters.dateFrom}:${filters.dateTo}`

        if (lastRequestKeyRef.current === requestKey) {
            return
        }

        lastRequestKeyRef.current = requestKey

        const loadTransactions = async () => {
            setIsLoadingTransactions(true)
            setTransactionsError(null)

            try {
                const data = await fetchTransactions(filters)
                const transactionsWithLogs = await Promise.all(
                    data.map(async (transaction) => {
                        try {
                            const logEntries = await fetchTransactionLog(
                                transaction.atm?.id ?? transaction.atmid,
                                transaction.devTime ?? transaction.deviceTime,
                            )

                            return {
                                ...transaction,
                                logEntries,
                            }
                        } catch {
                            return {
                                ...transaction,
                                logEntries: [],
                            }
                        }
                    }),
                )

                setTransactions(transactionsWithLogs)
            } catch {
                setTransactions([])
                setTransactionsError('Unable to load transactions')
            }

            setIsLoadingTransactions(false)
        }

        void loadTransactions()
    }, [filters, hasRequiredFilters])

    return (
        <div className={styles.transactions}>
            <h3>Results</h3>
            {!hasRequiredFilters ? <p>Set date range and ATM ID to load transactions.</p> : null}
            {hasRequiredFilters && transactionsError !== null ? <p>{transactionsError}</p> : null}
            {hasRequiredFilters && isLoadingTransactions ? <p>Loading transactions...</p> : null}
            {hasRequiredFilters && !isLoadingTransactions && transactionsError === null ? (
                <table style={{ width: '100%', tableLayout: 'fixed' }}>
                    <thead>
                        <tr style={{ textAlign: 'left' }}>
                            <th style={{ width: '10%' }}>Date</th>
                            <th style={{ width: '10%' }}>ATM ID</th>
                            <th style={{ width: '10%' }}>Customer PAN</th>
                            <th style={{ width: '50%' }}>Description</th>
                            <th style={{ width: '20%' }}>Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupedTransactions.map((transaction) => (
                            <tr key={`${transaction.pan}-${transaction.code}`} style={{ textAlign: 'left' }}>
                                <td>{transaction.date}</td>
                                <td>{transaction.atmId}</td>
                                <td>{transaction.pan}</td>
                                <td>
                                    <ul>
                                        {transaction.descriptions.map((description, index) => (
                                            <li key={`${transaction.pan}-description-${index}`}>{description.text}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        {transaction.descriptions.map((description, index) => (
                                            <li key={`${transaction.pan}-code-${index}`}>
                                                {description.timestamp && description.code
                                                    ? `${description.timestamp} ${description.code}`
                                                    : description.timestamp || description.code}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}
            {hasRequiredFilters && !isLoadingTransactions && transactionsError === null && groupedTransactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : null}
        </div>
    )
}