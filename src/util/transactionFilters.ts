export type TransactionFilters = {
    dateFrom: string
    dateTo: string
    atmId: string
    pan: string
    aid: string
    serialNumber: string
}

export const defaultTransactionFilters: TransactionFilters = {
    dateFrom: '',
    dateTo: '',
    atmId: '',
    pan: '',
    aid: '',
    serialNumber: '',
}