import prisma from '../lib/prisma'
import testingKits from '../data/testingKits.json'

async function processTestingKits() {
    try {
        // Create a mapping of drug names to their testing kit links
        const testingKitMap = testingKits.reduce<Record<string, string>>(
            (acc, kit) => {
                acc[kit.name.toLowerCase()] = kit.link
                return acc
            },
            {}
        )

        // Get all drugs from the database
        const drugs = await prisma.drug.findMany()

        // Update each drug with its corresponding testing kit
        for (const drug of drugs) {
            // Look for testing kit by matching drug names
            const matchingKit = drug.names.find(
                name => testingKitMap[name.toLowerCase()]
            )

            if (matchingKit) {
                await prisma.drug.update({
                    where: { id: drug.id },
                    data: {
                        testingKit: testingKitMap[matchingKit.toLowerCase()],
                    },
                })
                console.log(`Updated testing kit for ${matchingKit}`)
            }
        }

        console.log('Testing kit processing completed')
    } catch (error) {
        console.error('Error processing testing kits:', error)
    } finally {
        await prisma.$disconnect()
    }
}

processTestingKits()
