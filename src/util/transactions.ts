import {
    buildTransactionDateRange,
    hasRequiredTransactionFilters,
    type TransactionFilters,
} from './transactionFilters'

export type TransactionLogEntry = {
    code: string
    timestamp: string
    text: string
}

// Transaction log schema
export type TransactionItem = {
    atm?: TransactionNestedValue
    app?: TransactionNestedValue
    hst?: TransactionNestedValue
    ttp?: TransactionNestedValue
    pan?: string
    devTime?: number
    deviceTime?: string
    amount?: number
    amountW?: number
    amountP?: number
    amountR?: number
    ref?: string
    atmid?: number
    id?: number
    phase?: string
    ts?: number
    txnType?: string
}

type TransactionNestedValue = {
    id?: number
    txt?: string
    descr?: string
    additionalProp1?: string
    additionalProp2?: string
    additionalProp3?: string
}


type TransactionResponse = {
    txn?: TransactionItem[]
}

function sanitizeUrl(value: string): string {
    return value.replace(/[\u200B-\u200D\uFEFF]/g, '')
}

// Handpicked log codes, removing clutter
const ignoredTransactionLogCodes = new Set([
    '1015',
    '1042',
    '1043',
    '41004',
    '41005',
    '120812',
    '3214',
    '3206',
    '3951',
    '3952',
    '3953',
    '3959',
    '3215'
])

function shouldIncludeTransactionLogEntry(entry: TransactionLogEntry): boolean {
    if (ignoredTransactionLogCodes.has(entry.code)) {
        return false
    }

    if (/^\*+$/.test(entry.text)) {
        return false
    }

    return true
}

function parseTransactionLog(logText: string): TransactionLogEntry[] {
    return logText
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line !== '')
        .map((line) => {
            const match = line.match(/^(\d{2}:\d{2}:\d{2})\s+(\d+)\s+(.*)$/)

            if (!match) {
                return {
                    code: '',
                    timestamp: '',
                    text: line,
                }
            }

            return {
                code: match[2],
                timestamp: match[1],
                text: match[3].trim(),
            }
        })
        .filter((entry) => shouldIncludeTransactionLogEntry(entry))
}

export async function fetchTransactions(filters: TransactionFilters): Promise<TransactionItem[]> {
    const transactionUrlTemplate = import.meta.env.VITE_PAST_TRANSACTION_URL

    if (!transactionUrlTemplate || !hasRequiredTransactionFilters(filters)) {
        return []
    }

    // Insert the parameters here
    const url = sanitizeUrl(transactionUrlTemplate)
        .replace('{atmid}', encodeURIComponent(filters.atmId))
        .replace('{datetime}', encodeURIComponent(buildTransactionDateRange(filters)))

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Failed to load transactions: ${response.status}`)
    }

    const data = (await response.json()) as TransactionResponse

    return Array.isArray(data.txn) ? data.txn : []
}

export async function fetchTransactionLog(
    atmId: number | string | undefined,
    devTime: number | string | undefined,
): Promise<TransactionLogEntry[]> {
    const transactionLogUrl = import.meta.env.VITE_TRANSACTION_LOG_URL

    if (!transactionLogUrl || atmId === undefined || devTime === undefined) {
        return []
    }

    const url = new URL(sanitizeUrl(transactionLogUrl))
    url.searchParams.set('a', String(atmId))
    url.searchParams.set('t', String(devTime))

    const response = await fetch(url.toString())

    if (!response.ok) {
        throw new Error(`Failed to load transaction log: ${response.status}`)
    }

    const data = await response.text()

    return parseTransactionLog(data)
}