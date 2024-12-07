import type { Nullable } from '../types/Nullable.type'

const extractDosageUnits = (str: string): Nullable<string> => {
    const units = new Set(['mg', 'g', 'ml', 'l', 'mcg'])
    const tokens = str.toLowerCase().split(' ')

    for (const token of tokens) {
        if (units.has(token)) {
            return token
        }
    }

    return undefined
}

export default extractDosageUnits
