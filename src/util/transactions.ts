import {
    buildTransactionDateRange,
    hasRequiredTransactionFilters,
    type TransactionFilters,
} from './transactionFilters'

export async function fetchTransactions(filters: TransactionFilters): Promise<unknown> {
    const transactionUrlTemplate = import.meta.env.VITE_PAST_TRANSACTION_URL

    if (!transactionUrlTemplate || !hasRequiredTransactionFilters(filters)) {
        return []
    }

    // Insert the parameters here
    const url = transactionUrlTemplate
        .replace(/[\u200B-\u200D\uFEFF]/g, '')
        .replace('{atmid}', encodeURIComponent(filters.atmId))
        .replace('{datetime}', encodeURIComponent(buildTransactionDateRange(filters)))

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Failed to load transactions: ${response.status}`)
    }

    return (await response.json()) as unknown
}