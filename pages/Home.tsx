import { FC, useMemo } from 'react'
import { View } from 'react-native'
import Search from '../components/Search'
import { getByIds, findInteractionsBetween } from '../util/drugs'
import Drug from '../components/Drug'
import styles from './Home.style'
import Text from '../components/Text'
import Button from '../components/Button'
import { useSelectedDrugs } from '../contexts/SelectedDrugsContext'
import { useNavigation } from '../contexts/NavigationContext'

const Home: FC = () => {
    const { selectedDrugIds, removeDrug } = useSelectedDrugs()
    const { setCurrentPage } = useNavigation()

    const selectedDrugs = useMemo(
        () => getByIds(selectedDrugIds),
        [selectedDrugIds]
    )

    const { mostDangerousType } = useMemo(() => {
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

    const calculatePosition = (index: number, total: number) => {
        if (total === 0) return { position: 'absolute' as const }

        const plateRadius = 150
        const radius = 100
        const angle = (2 * Math.PI * index) / total

        return {
            position: 'absolute' as const,
            left: plateRadius + radius * Math.cos(angle) - 60,
            top: plateRadius + radius * Math.sin(angle) - 40,
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.plate}>
                {selectedDrugs.map((drug, i) => (
                    <Drug
                        drug={drug}
                        deleteById={removeDrug}
                        key={drug.id}
                        style={calculatePosition(i, selectedDrugs.length)}
                    />
                ))}
                <Button
                    style={styles.interactionContainer}
                    onPress={() => setCurrentPage('interactions')}
                >
                    {(() => {
                        switch (mostDangerousType) {
                            case 'PSYCHOLOGICALLY_DIFFICULT':
                                return (
                                    <Text style={styles.label}>
                                        ⚠️ Psychologically Difficult
                                    </Text>
                                )
                            case 'DANGEROUS':
                                return (
                                    <Text style={styles.label}>
                                        ⛔️ Dangerous
                                    </Text>
                                )
                            case 'LETHAL':
                                return (
                                    <Text style={styles.label}>💀 Lethal</Text>
                                )
                            default:
                                return <Text style={styles.label}>✅ Safe</Text>
                        }
                    })()}
                </Button>
            </View>
            <Search />
        </View>
    )
}

export default Home
