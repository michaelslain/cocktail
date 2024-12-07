import prisma from '../lib/prisma'

const searchDrug = async () => {
    try {
        // Get search term from command line arguments
        const searchTerm = process.argv[2]

        if (!searchTerm) {
            console.log('Please provide a drug name to search for.')
            console.log('Usage: bun run search <drug name>')
            return
        }

        // Search in names array
        const allDrugs = await prisma.drug.findMany()
        const drugs = allDrugs.filter(drug =>
            drug.names.some(
                name =>
                    name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    name.toLowerCase() === searchTerm.toLowerCase()
            )
        )

        if (drugs.length === 0) {
            console.log(`No drugs found matching "${searchTerm}"`)
            return
        }

        // Display results
        console.log(`Found ${drugs.length} matching drugs:\n`)
        drugs.forEach((drug, index) => {
            console.log(`${index + 1}. ${drug.names[0]}`)

            if (drug.names.length > 1)
                console.log(
                    `   Also known as: ${drug.names.slice(1).join(', ')}`
                )

            if (drug.effects && drug.effects.length > 0)
                console.log(`   Effects: ${drug.effects.join(', ')}`)

            console.log()
        })
    } catch (error) {
        console.error('Error searching drugs:', error)
    } finally {
        await prisma.$disconnect()
    }
}

searchDrug()
