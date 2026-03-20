export type AtmListItem = {
    country: string
    id: number
    lt: number
    name: string
    ts: number
}

export async function fetchAtmList(): Promise<AtmListItem[]> {
    const atmListUrl = import.meta.env.VITE_ATM_LIST_URL

    // Fallback is only an empty list
    if (!atmListUrl) {
        return []
    }

    const response = await fetch(atmListUrl)

    if (!response.ok) {
        throw new Error(`Failed to load ATM list: ${response.status}`)
    }

    return (await response.json()) as AtmListItem[]
}