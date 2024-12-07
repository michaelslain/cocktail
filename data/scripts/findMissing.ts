import prisma from '../lib/prisma'

const findMissing = async () => {
    const field = process.argv[2]

    if (!field) {
        console.error('Please provide a field name as an argument')
        process.exit(1)
    }

    try {
        // Fetch all records and select the relevant field
        const drugs = await prisma.drug.findMany({
            select: {
                id: true,
                names: true,
                [field]: true,
            },
        })

        // Filter records with missing or empty field values
        const missingDrugs = drugs.filter(drug => {
            const value = drug[field]

            // Handle the case where the field is null
            if (value === null) return true

            // Handle the case where the field is an array
            if (Array.isArray(value) && value.length === 0) return true

            // If it's neither null nor an empty array, it's valid
            return false
        })

        if (missingDrugs.length === 0) {
            console.log(`No drugs found with missing or empty ${field}`)
            return
        }

        console.log(
            `Found ${missingDrugs.length} drugs with missing or empty ${field}:`
        )
        missingDrugs.forEach(drug => {
            console.log(
                `- ${drug.names[0]} (${drug.id}): ${JSON.stringify(
                    drug[field]
                )}`
            )
        })
    } catch (error) {
        console.error('Error finding missing fields:', error)
    } finally {
        await prisma.$disconnect()
    }
}

findMissing()
