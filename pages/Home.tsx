import { FC, useState, useMemo } from 'react'
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import Search from '../components/Search'
import { getByIds, findInteractionsBetween } from '../util/drugs'
import Drug from '../components/Drug'
import styles from './Home.style'

const Home: FC = () => {
    const [selectedDrugIds, setSelectedDrugIds] = useState<string[]>([])
    const [showInteractions, setShowInteractions] = useState(false)

    const selectedDrugs = useMemo(
        () => getByIds(selectedDrugIds),
        [selectedDrugIds]
    )

    const { interactions, mostDangerousType } = useMemo(() => {
        const interactions = findInteractionsBetween(selectedDrugIds)
        const dangerLevels = [
            'PSYCHOLOGICALLY_DIFFICULT',
            'DANGEROUS',
            'LETHAL',
        ]

        const mostDangerousType = interactions.reduce(
            (maxType, interaction) => {
                const currentLevel = dangerLevels.indexOf(interaction.type)
                const maxLevel = dangerLevels.indexOf(maxType)
                return currentLevel > maxLevel ? interaction.type : maxType
            },
            '' as (typeof dangerLevels)[number]
        )

        return { interactions, mostDangerousType }
    }, [selectedDrugIds])

    const handleSelectDrug = (id: string): void =>
        setSelectedDrugIds([...selectedDrugIds, id])

    const deleteById = (id: string): void =>
        setSelectedDrugIds(selectedDrugIds.filter(drugId => drugId !== id))

    const toggleInteractions = () => setShowInteractions(!showInteractions)

    return (
        <View style={styles.container}>
            <View style={styles.plate}>
                {selectedDrugs.map(drug => (
                    <Drug {...{ drug, deleteById }} key={drug.id} />
                ))}
            </View>
            <TouchableOpacity
                style={styles.interactionContainer}
                onPress={toggleInteractions}
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
                                <Text style={styles.label}>⛔️ Dangerous</Text>
                            )
                        case 'LETHAL':
                            return <Text style={styles.label}>💀 Lethal</Text>
                        default:
                            return <Text style={styles.label}>✅ Safe</Text>
                    }
                })()}
            </TouchableOpacity>
            {showInteractions && interactions.length > 0 && (
                <Modal
                    visible={showInteractions}
                    transparent
                    onRequestClose={toggleInteractions}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            {interactions.map((interaction, index) => (
                                <View
                                    key={index}
                                    style={styles.interactionItem}
                                >
                                    <Text style={styles.interactionType}>
                                        {interaction.type}
                                    </Text>
                                    <Text style={styles.interactionDescription}>
                                        {interaction.description}
                                    </Text>
                                </View>
                            ))}
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={toggleInteractions}
                            >
                                <Text>X</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
            <Search onSelectDrug={handleSelectDrug} />
        </View>
    )
}

export default Home
