import prisma from '../lib/prisma'
import fs from 'fs'
import path from 'path'

interface DrugExport {
    id: string
    names: string[]
    type: string | null
    lacingPrevalence: number | null
    testingKit: string | null
    effects: string[] | null
    harmReductionTips: string[] | null
    halfLife: string | null
    onsetTime: string | null
    dosages: {
        level: string
        amount: number
        unit: string
    }[]
    interactions: {
        type: string
        description: string
        interactingDrugs: string[]
    }[]
    lacedBy: {
        name: string
        prevalence: number
    }[]
    laces: {
        name: string
        prevalence: number
    }[]
}

const exportToJSON = async () => {
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

        const exportData: DrugExport[] = drugs.map(drug => ({
            id: drug.id,
            names: drug.names,
            type: drug.type,
            lacingPrevalence: drug.lacingPrevalence
                ? Number(drug.lacingPrevalence)
                : null,
            testingKit: drug.testingKit,
            effects: drug.effects,
            harmReductionTips: drug.harmReductionTips,
            halfLife: drug.halfLife?.toString() || null,
            onsetTime: drug.onsetTime?.toString() || null,
            dosages: drug.dosages.map(d => ({
                level: d.level,
                amount: d.amount,
                unit: d.unit,
            })),
            interactions: drug.interactions.map(i => ({
                type: i.type,
                description: i.description,
                interactingDrugs: i.drugs.map(d => d.names[0]),
            })),
            lacedBy: drug.lacedBy.map(l => ({
                name: l.names[0],
                prevalence: l.lacingPrevalence ? Number(l.lacingPrevalence) : 0,
            })),
            laces: drug.laces.map(l => ({
                name: l.names[0],
                prevalence: l.lacingPrevalence ? Number(l.lacingPrevalence) : 0,
            })),
        }))

        const outputPath = path.join(__dirname, 'data.json')
        fs.writeFileSync(
            outputPath,
            JSON.stringify(exportData, null, 2),
            'utf-8'
        )

        console.log(
            `Successfully exported ${drugs.length} drugs to ${outputPath}`
        )
    } catch (error) {
        console.error('Error exporting drugs:', error)
    } finally {
        await prisma.$disconnect()
    }
}

exportToJSON()
