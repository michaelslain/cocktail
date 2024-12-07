import prisma from '../lib/prisma'
import fs from 'fs'
import path from 'path'

async function processNames() {
    try {
        // Read the drugs.json file
        const drugsData = JSON.parse(
            fs.readFileSync(
                path.join(__dirname, '..', 'data', 'drugs.json'),
                'utf-8'
            )
        )

        // Create drugs in database
        for (const drug of drugsData) {
            await prisma.drug.create({
                data: {
                    names: drug.names,
                    type: drug.type,
                },
            })
        }

        console.log('Successfully imported drugs data')
    } catch (error) {
        console.error('Error importing drugs:', error)
    } finally {
        await prisma.$disconnect()
    }
}

processNames()
