import data from '../data/export/data.json'

export interface DrugInteraction {
    type: 'LETHAL' | 'DANGEROUS' | 'PSYCHOLOGICALLY_DIFFICULT'
    description: string
    interactingDrugs: string[]
}

export interface Drug {
    id: string
    names: string[]
    type: string
    lacingPrevalence: number | null
    testingKit: string | null
    effects: string[]
    harmReductionTips: string[]
    halfLife: string | null
    onsetTime: string | null
    dosages: any[] // Could be typed more specifically if needed
    interactions: DrugInteraction[]
    lacedBy: Array<{ name: string; prevalence: number | null }>
    laces: Array<{ name: string; prevalence: number | null }>
}

export function getAll(): Drug[] {
    return data as Drug[]
}

export function getByName(name: string): Drug | undefined {
    const normalizedName = name.toLowerCase()
    return getAll().find(drug =>
        drug.names.some(n => n.toLowerCase() === normalizedName)
    )
}

export function getById(id: string): Drug | undefined {
    return getAll().find(drug => drug.id === id)
}

export function getByIds(ids: string[]): Drug[] {
    return getAll().filter(drug => ids.includes(drug.id))
}

export function findInteractionsBetween(drugIds: string[]): DrugInteraction[] {
    const drugs = getByIds(drugIds)
    const drugNames = drugs.map(drug => drug.names[0].toLowerCase())
    const interactions: DrugInteraction[] = []

    getAll().forEach(drug => {
        drug.interactions.forEach(interaction => {
            const interactingDrugsLower = interaction.interactingDrugs.map(d =>
                d.toLowerCase()
            )

            // Check if the interaction involves exactly the selected drugs
            const allSelectedDrugsInvolved = drugNames.every(name =>
                interactingDrugsLower.includes(name)
            )
            const noExtraDrugsInvolved = interactingDrugsLower.every(name =>
                drugNames.includes(name)
            )

            // Check if this interaction is unique
            const isDuplicate = interactions.some(
                existingInteraction =>
                    existingInteraction.type === interaction.type &&
                    existingInteraction.description ===
                        interaction.description &&
                    existingInteraction.interactingDrugs.length ===
                        interaction.interactingDrugs.length &&
                    existingInteraction.interactingDrugs.every(drug =>
                        interaction.interactingDrugs.includes(drug)
                    )
            )

            if (
                allSelectedDrugsInvolved &&
                noExtraDrugsInvolved &&
                !isDuplicate
            ) {
                interactions.push(interaction)
            }
        })
    })

    return interactions
}

export function getAllNames(): string[] {
    const names = new Set<string>()
    getAll().forEach(drug => {
        drug.names.forEach(name => names.add(name))
    })
    return Array.from(names)
}

export function getByType(type: string): Drug[] {
    const normalizedType = type.toLowerCase()
    return getAll().filter(drug => drug.type.toLowerCase() === normalizedType)
}

export function search(query: string): Drug[] {
    const normalizedQuery = query.toLowerCase()
    return getAll().filter(
        drug =>
            drug.names.some(name =>
                name.toLowerCase().includes(normalizedQuery)
            ) || drug.type.toLowerCase().includes(normalizedQuery)
    )
}

export function fuzzySearch(query: string): Drug[] {
    if (!query) return []

    const normalizedQuery = query.toLowerCase()
    const allDrugs = getAll()

    // Score and sort drugs based on match quality
    const scoredDrugs = allDrugs.map(drug => {
        // Find best matching name for this drug
        const bestNameScore = Math.max(
            ...drug.names.map(name => {
                const normalizedName = name.toLowerCase()

                // Exact match gets highest score
                if (normalizedName === normalizedQuery) return 1

                // Starts with query gets high score
                if (normalizedName.startsWith(normalizedQuery)) return 0.8

                // Contains query gets medium score
                if (normalizedName.includes(normalizedQuery)) return 0.6

                // Calculate Levenshtein distance for fuzzy matching
                const distance = levenshteinDistance(
                    normalizedName,
                    normalizedQuery
                )
                const maxLength = Math.max(
                    normalizedName.length,
                    normalizedQuery.length
                )
                const similarity = 1 - distance / maxLength

                return similarity > 0.4 ? similarity : 0 // Only consider if somewhat similar
            })
        )

        return {
            drug,
            score: bestNameScore,
        }
    })

    // Filter out low scores and sort by score descending
    return scoredDrugs
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(item => item.drug)
}

// Helper function to calculate Levenshtein distance between two strings
function levenshteinDistance(str1: string, str2: string): number {
    const m = str1.length
    const n = str2.length
    const dp: number[][] = Array(m + 1)
        .fill(null)
        .map(() => Array(n + 1).fill(0))

    for (let i = 0; i <= m; i++) dp[i][0] = i
    for (let j = 0; j <= n; j++) dp[0][j] = j

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j - 1] + 1, // substitution
                    dp[i - 1][j] + 1, // deletion
                    dp[i][j - 1] + 1 // insertion
                )
            }
        }
    }

    return dp[m][n]
}
