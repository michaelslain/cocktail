import prisma from '../lib/prisma'
import interactionsData from '../data/interactions.json'

// Add proper type validation
const VALID_INTERACTION_TYPES = [
    'LETHAL',
    'DANGEROUS',
    'PSYCHOLOGICALLY_DIFFICULT',
] as const
type InteractionType = (typeof VALID_INTERACTION_TYPES)[number]

async function processInteractions() {
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

        // Process interactions in smaller batches
        const batchSize = 50
        for (let i = 0; i < interactionsData.length; i += batchSize) {
            const batch = interactionsData.slice(i, i + batchSize)

            // Process batch sequentially to avoid DB overload
            for (const interaction of batch) {
                try {
                    if (!isValidInteractionType(interaction.type)) {
                        throw new Error(
                            `Invalid interaction type: ${interaction.type}`
                        )
                    }

                    const drugIds = interaction.drugs
                        .map(name => drugMap.get(name.toLowerCase()))
                        .filter((id): id is string => id !== undefined)

                    if (drugIds.length !== interaction.drugs.length) {
                        throw new Error(
                            `Some drugs not found: ${interaction.drugs.join(
                                ', '
                            )}`
                        )
                    }

                    // Check for existing interaction to avoid duplicates
                    const exists = await prisma.drugInteraction.findFirst({
                        where: {
                            AND: drugIds.map(id => ({
                                drugs: { some: { id } },
                            })),
                        },
                    })

                    if (exists) {
                        console.warn(
                            `Skipping duplicate interaction: ${interaction.description}`
                        )
                        continue
                    }

                    await prisma.drugInteraction.create({
                        data: {
                            type: interaction.type
                                .toUpperCase()
                                .replace(' ', '_') as InteractionType,
                            description: interaction.description.trim(),
                            drugs: {
                                connect: drugIds.map(id => ({ id })),
                            },
                        },
                    })
                    successCount++
                } catch (error) {
                    failureCount++
                    console.error(`Error processing interaction:`, error)
                }
            }
        }

        console.log(
            `Processed ${successCount} interactions successfully, ${failureCount} failures`
        )
    } catch (error) {
        console.error('Error processing interactions data:', error)
        throw error
    } finally {
        await prisma.$disconnect()
    }
}

function isValidInteractionType(type: string): type is InteractionType {
    return VALID_INTERACTION_TYPES.includes(
        type.toUpperCase().replace(' ', '_') as InteractionType
    )
}

// Execute the processing
processInteractions().catch(error => {
    console.error('Failed to process interactions data:', error)
    process.exit(1)
})
