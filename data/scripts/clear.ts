import prisma from '../lib/prisma'

const clear = async () => {
    try {
        await prisma.drugInteraction.deleteMany()
        await prisma.drug.deleteMany()
        console.log('Successfully cleared all entries from the database.')
    } catch (error) {
        console.error('Error clearing database:', error)
    } finally {
        await prisma.$disconnect()
    }
}

clear()
