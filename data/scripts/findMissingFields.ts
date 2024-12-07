import prisma from '../lib/prisma'

interface FieldCheck {
    name: string
    check: (value: any) => boolean
}

async function findMissingFields() {
    try {
        // Define field checks
        const fieldChecks: FieldCheck[] = [
            {
                name: 'type',
                check: value => !value,
            },
            {
                name: 'minRecommendedDosage',
                check: value => value === null || value === undefined,
            },
            {
                name: 'maxRecommendedDosage',
                check: value => value === null || value === undefined,
            },
            {
                name: 'dangerousDosage',
                check: value => value === null || value === undefined,
            },
            {
                name: 'overdoseDosage',
                check: value => value === null || value === undefined,
            },
            {
                name: 'testingKit',
                check: value => !value,
            },
            {
                name: 'effects',
                check: value => !value || value.length === 0,
            },
            {
                name: 'dosageUnits',
                check: value => !value,
            },
            {
                name: 'harmReductionTips',
                check: value => !value || value.length === 0,
            },
            {
                name: 'halfLife',
                check: value => value === null || value === undefined,
            },
            {
                name: 'onsetTime',
                check: value => value === null || value === undefined,
            },
            {
                name: 'interactions',
                check: value => !value || value.length === 0,
            },
            {
                name: 'lacedBy',
                check: value => !value || value.length === 0,
            },
            {
                name: 'laces',
                check: value => !value || value.length === 0,
            },
            {
                name: 'lacingPrevalence',
                check: value => !value,
            },
        ]

        // Fetch all drugs from database
        const drugs = await prisma.drug.findMany({
            include: {
                interactions: true,
                lacedBy: true,
                laces: true,
            },
        })

        // Track count of missing fields
        const missingFieldCounts: Record<string, number> = {}

        // Initialize counts
        fieldChecks.forEach(check => {
            missingFieldCounts[check.name] = 0
        })

        // Count missing fields
        for (const drug of drugs) {
            fieldChecks.forEach(check => {
                if (check.check(drug[check.name as keyof typeof drug])) {
                    missingFieldCounts[check.name]++
                }
            })
        }

        console.log('Missing field counts:')
        console.log('--------------------')
        Object.entries(missingFieldCounts)
            .sort((a, b) => b[1] - a[1]) // Sort by count descending
            .forEach(([field, count]) => {
                let color = ''
                if (count === drugs.length) {
                    color = '\x1b[31m' // Red if all missing
                } else if (count > 0) {
                    color = '\x1b[33m' // Yellow if some missing
                }
                const reset = color ? '\x1b[0m' : '' // Reset color if we used one
                console.log(
                    `${color}${field}: ${count}/${drugs.length} missing${reset}`
                )
            })
    } catch (error) {
        console.error('Error finding missing fields:', error)
    } finally {
        await prisma.$disconnect()
    }
}

findMissingFields()
