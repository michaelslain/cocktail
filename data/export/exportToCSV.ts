import prisma from '../lib/prisma'
import fs from 'fs'
import path from 'path'

const exportToCSV = async () => {
    try {
        const drugs = await prisma.drug.findMany({
            include: {
                dosages: true,
                interactions: {
                    include: {
                        drugs: true,
                    },
                },
                lacedBy: true,
                laces: true,
            },
        })

        if (drugs.length === 0) {
            console.log('No data found to export.')
            return
        }

        const headers = [
            'id',
            'names',
            'type',
            'lacingPrevalence',
            'testingKit',
            'effects',
            'harmReductionTips',
            'halfLife',
            'onsetTime',
            'dosages',
            'interactions',
            'lacedBy',
            'laces',
        ]

        const rows = drugs.map(drug => {
            const row = headers.map(header => {
                const value = drug[header as keyof typeof drug]

                if (value === null || value === undefined) return '""'

                if (header === 'dosages')
                    return `"${drug.dosages
                        .map(d => `${d.level}: ${d.amount}${d.unit}`)
                        .join('; ')
                        .replace(/"/g, '""')}"`

                if (header === 'interactions')
                    return `"${drug.interactions
                        .map(i => `${i.type}: ${i.description}`)
                        .join('; ')
                        .replace(/"/g, '""')}"`

                if (header === 'lacedBy' || header === 'laces')
                    return `"${drug[header]
                        .map(d => d.names[0])
                        .join('; ')
                        .replace(/"/g, '""')}"`

                if (Array.isArray(value))
                    return `"${value.join('; ').replace(/"/g, '""')}"`

                if (typeof value === 'string')
                    return `"${value.replace(/"/g, '""')}"`

                return `"${String(value).replace(/"/g, '""')}"`
            })

            return row.join(',')
        })

        const csvContent = headers.join(',') + '\n' + rows.join('\n')

        const filePath = path.resolve(__dirname, 'data.csv')

        const directory = path.dirname(filePath)
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true })
        }

        fs.writeFileSync(filePath, csvContent, 'utf8')
        console.log(`Data successfully exported to ${filePath}`)
    } catch (error) {
        console.error('Error exporting data:', error)
    } finally {
        await prisma.$disconnect()
    }
}

exportToCSV()
