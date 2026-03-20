export type AidListItem = {
    aid: string
    country: string
    descr: string
    id: number
    name: string
    type: string
    vendor: string
}

export async function fetchAidList(): Promise<AidListItem[]> {
    const aidListUrl = import.meta.env.VITE_AID_LIST_URL

    if (!aidListUrl) {
        return []
    }

    const response = await fetch(aidListUrl)

    if (!response.ok) {
        throw new Error(`Failed to load AID list: ${response.status}`)
    }

    return (await response.json()) as AidListItem[]
}