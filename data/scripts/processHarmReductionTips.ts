import prisma from '../lib/prisma'
import harmReductionTips from '../data/harmReductionTips.json'

interface HarmReductionEntry {
    name: string
    tips: string[]
}

async function processHarmReductionTips() {
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
        for (let i = 0; i < harmReductionTips.length; i += batchSize) {
            const batch = harmReductionTips.slice(
                i,
                i + batchSize
            ) as HarmReductionEntry[]

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
                            harmReductionTips: entry.tips,
                        },
                    })

                    successCount++
                } catch (error) {
                    failureCount++
                    console.error(
                        `Error processing harm reduction tips for ${entry.name}:`,
                        error
                    )
                }
            }
        }

        console.log(
            `Processed ${successCount} harm reduction entries successfully, ${failureCount} failures`
        )
    } catch (error) {
        console.error('Error processing harm reduction data:', error)
        throw error
    } finally {
        await prisma.$disconnect()
    }
}

// Execute the processing
processHarmReductionTips().catch(error => {
    console.error('Failed to process harm reduction data:', error)
    process.exit(1)
})
