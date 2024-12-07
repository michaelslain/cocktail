import { LacingPrevalence } from '@prisma/client'
import prisma from '../lib/prisma'
import lacingData from '../data/lacing.json'

interface LacingEntry {
    names: string[]
    lacingPrevalence: keyof typeof LacingPrevalence
    lacedBy: string[]
}

async function processLacing() {
    try {
        // First, create all drugs with their basic information
        for (const drug of lacingData as LacingEntry[]) {
            await prisma.drug.upsert({
                where: {
                    // Use the first name as the primary identifier
                    id:
                        (await findDrugIdByName(drug.names[0])) ||
                        drug.names[0],
                },
                create: {
                    names: drug.names,
                    lacingPrevalence: drug.lacingPrevalence,
                },
                update: {
                    names: drug.names,
                    lacingPrevalence: drug.lacingPrevalence,
                },
            })
        }

        // Then, process lacing relationships
        for (const drug of lacingData as LacingEntry[]) {
            const drugId = await findDrugIdByName(drug.names[0])
            if (!drugId) continue

            // Get IDs of all drugs that lace this drug
            const lacedByIds = await Promise.all(
                drug.lacedBy.map(async name => await findDrugIdByName(name))
            )

            // Filter out any null values and update the relationships
            const validLacedByIds = lacedByIds.filter(
                (id): id is string => id !== null
            )

            await prisma.drug.update({
                where: { id: drugId },
                data: {
                    lacedBy: {
                        connect: validLacedByIds.map(id => ({ id })),
                    },
                },
            })
        }

        console.log('Lacing data processed successfully')
    } catch (error) {
        console.error('Error processing lacing data:', error)
        throw error
    } finally {
        await prisma.$disconnect()
    }
}

async function findDrugIdByName(name: string): Promise<string | null> {
    const drug = await prisma.drug.findFirst({
        where: {
            names: {
                has: name,
            },
        },
    })
    return drug?.id || null
}

// Execute the processing
processLacing().catch(error => {
    console.error('Failed to process lacing data:', error)
    process.exit(1)
})
