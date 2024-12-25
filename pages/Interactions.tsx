import { FC, useMemo } from 'react'
import { View, ScrollView } from 'react-native'
import { useSelectedDrugs } from '../contexts/SelectedDrugsContext'
import { findInteractionsBetween } from '../util/drugs'
import Text from '../components/Text'
import BackButton from '../components/BackButton'
import Interaction from '../components/Interaction'
import styles from './Interactions.style'

const Interactions: FC = () => {
    const { selectedDrugIds } = useSelectedDrugs()

    const { interactions, mostDangerousType } = useMemo(() => {
        const interactions = findInteractionsBetween(selectedDrugIds)
        const dangerLevels = [
            'PSYCHOLOGICALLY_DIFFICULT',
            'DANGEROUS',
            'LETHAL',
        ] as const

        if (interactions.length === 0) {
            return { interactions, mostDangerousType: 'SAFE' }
        }

        const mostDangerousType = interactions.reduce(
            (maxType, interaction) => {
                const currentLevel = dangerLevels.indexOf(interaction.type)
                const maxLevel = dangerLevels.indexOf(
                    maxType as (typeof dangerLevels)[number]
                )
                return currentLevel > maxLevel ? interaction.type : maxType
            },
            'PSYCHOLOGICALLY_DIFFICULT' as (typeof dangerLevels)[number]
        )

        return { interactions, mostDangerousType }
    }, [selectedDrugIds])

    return (
        <View style={styles.container}>
            <BackButton />
            <Text style={styles.title}>Drug Interactions</Text>
            <Text style={styles.dangerLevel}>
                {(() => {
                    switch (mostDangerousType) {
                        case 'PSYCHOLOGICALLY_DIFFICULT':
                            return '⚠️ Psychologically Difficult'
                        case 'DANGEROUS':
                            return '⛔️ Dangerous'
                        case 'LETHAL':
                            return '💀 Lethal'
                        default:
                            return '✅ Safe'
                    }
                })()}
            </Text>
            <ScrollView style={styles.interactionsContainer}>
                {interactions.map((interaction, index) => (
                    <Interaction key={index} interaction={interaction} />
                ))}
            </ScrollView>
        </View>
    )
}

export default Interactions
