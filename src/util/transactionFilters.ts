export type TransactionFilters = {
    dateFrom: string
    dateTo: string
    atmId: string
    pan: string
    aid: string
    serialNumber: string
}

export const defaultTransactionFilters: TransactionFilters = {
    dateFrom: '2019-01-01',
    dateTo: '2020-12-30',
    atmId: '21',
    pan: '',
    aid: '',
    serialNumber: '',
}

// Date format converter
export function formatDateForTransaction(value: string): string {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return ''
    }

    const [year, month, day] = value.split('-')

    return `${month}${day}${year}`
}

export function buildTransactionDateRange(filters: TransactionFilters): string {
    return `${formatDateForTransaction(filters.dateFrom)}${formatDateForTransaction(filters.dateTo)}`
}

// Conditional check for required filters
export function hasRequiredTransactionFilters(filters: TransactionFilters): boolean {
    return filters.dateFrom !== '' && filters.dateTo !== '' && filters.atmId !== ''
}