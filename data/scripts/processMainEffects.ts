import prisma from '../lib/prisma'
import effectsData from '../data/effects.json'

interface EffectsEntry {
    name: string
    effects: string[]
}

async function processEffects() {
    try {
        let successCount = 0
        let failureCount = 0

        // Create a drug name to ID map upfront to reduce DB queries
        const drugMap = new Map<string, string>()
        const allDrugs = await prisma.drug.findMany({
            select: { id: true, names: true },
        })
        allDrugs.forEach(drug => {
            drug.names.forEach(name => drugMap.set(name.toLowerCase(), drug.id))
        })

        // Process in smaller batches
        const batchSize = 50
        for (let i = 0; i < effectsData.length; i += batchSize) {
            const batch = effectsData.slice(i, i + batchSize) as EffectsEntry[]

            // Process batch sequentially to avoid DB overload
            for (const entry of batch) {
                try {
                    const drugId = drugMap.get(entry.name.toLowerCase())

                    if (!drugId) {
                        throw new Error(`Drug not found: ${entry.name}`)
                    }

                    await prisma.drug.update({
                        where: { id: drugId },
                        data: {
                            effects: entry.effects,
                        },
                    })

                    successCount++
                } catch (error) {
                    failureCount++
                    console.error(
                        `Error processing effects for ${entry.name}:`,
                        error
                    )
                }
            }
        }

        console.log(
            `Processed ${successCount} effects entries successfully, ${failureCount} failures`
        )
    } catch (error) {
        console.error('Error processing effects data:', error)
        throw error
    } finally {
        await prisma.$disconnect()
    }
}

// Execute the processing
processEffects().catch(error => {
    console.error('Failed to process effects data:', error)
    process.exit(1)
})
