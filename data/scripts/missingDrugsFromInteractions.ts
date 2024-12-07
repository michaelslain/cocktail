interface Interaction {
    type: string
    description: string
    drugs: string[]
}

interface Drug {
    names: string[]
    type: string
}

function findMissingDrugs(): void {
    // Read the JSON files
    const interactions: Interaction[] = require('../data/interactions.json')
    const drugs: Drug[] = require('../data/drugs.json')

    // Create a Set of all drug names (including aliases)
    const knownDrugs = new Set<string>()
    drugs.forEach(drug => {
        drug.names.forEach(name => {
            knownDrugs.add(name.toLowerCase())
        })
    })

    // Find all unique drugs in interactions
    const interactionDrugs = new Set<string>()
    interactions.forEach(interaction => {
        interaction.drugs.forEach(drug => {
            interactionDrugs.add(drug.toLowerCase())
        })
    })

    // Find drugs that appear in interactions but not in drugs.json
    const missingDrugs = new Set<string>()
    interactionDrugs.forEach(drug => {
        if (!knownDrugs.has(drug.toLowerCase())) {
            missingDrugs.add(drug)
        }
    })

    // Output results
    console.log('Drugs found in interactions but missing from drugs.json:')
    console.log(Array.from(missingDrugs).sort().join('\n'))
    console.log(`\nTotal missing drugs: ${missingDrugs.size}`)
}

findMissingDrugs()
