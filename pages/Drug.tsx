import { FC, useMemo } from 'react'
import { View, Text, TouchableOpacity, Linking } from 'react-native'
import { useNavigation } from '../contexts/NavigationContext'
import { getById } from '../util/drugs'
import styles from './Drug.style'

const Drug: FC = () => {
    const { currentDrugId, setCurrentPage } = useNavigation()

    if (!currentDrugId) {
        setCurrentPage('home')
        return <></>
    }

    const drug = useMemo(() => getById(currentDrugId), [currentDrugId])

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setCurrentPage('home')}
            >
                <Text>X</Text>
            </TouchableOpacity>
            <Text style={styles.primaryName}>{drug?.names[0]}</Text>
            <View style={styles.secondaryNamesContainer}>
                {drug?.names.slice(1).map((name, index) => (
                    <Text style={styles.secondaryName} key={index}>
                        {name}
                    </Text>
                ))}
            </View>
            <Text style={styles.label}>
                Type: <Text style={styles.value}>{drug?.type}</Text>
            </Text>
            <Text style={styles.label}>
                Effects:{' '}
                <Text style={styles.value}>{drug?.effects.join(', ')}</Text>
            </Text>
            <Text style={styles.label}>
                Harm Reduction Tips:{' '}
                <Text style={styles.value}>
                    {drug?.harmReductionTips.join(', ')}
                </Text>
            </Text>
            {drug?.halfLife && (
                <Text style={styles.label}>
                    Half Life: <Text style={styles.value}>{drug.halfLife}</Text>
                </Text>
            )}
            {drug?.onsetTime && (
                <Text style={styles.label}>
                    Onset Time:{' '}
                    <Text style={styles.value}>{drug.onsetTime}</Text>
                </Text>
            )}
            {drug?.testingKit && (
                <Text style={styles.label}>
                    Testing Kit:{' '}
                    <Text
                        style={[styles.value, styles.link]}
                        onPress={() =>
                            drug.testingKit && Linking.openURL(drug.testingKit)
                        }
                    >
                        {drug.testingKit}
                    </Text>
                </Text>
            )}
            {drug?.lacingPrevalence !== null && (
                <Text style={styles.label}>
                    Lacing Prevalence:{' '}
                    <Text style={styles.value}>{drug?.lacingPrevalence}%</Text>
                </Text>
            )}
            <Text style={styles.sectionHeader}>Interactions:</Text>
            {drug?.interactions.map((interaction, index) => (
                <View style={styles.interactionContainer} key={index}>
                    <Text style={styles.label}>
                        Type:{' '}
                        <Text style={styles.value}>{interaction.type}</Text>
                    </Text>
                    <Text style={styles.label}>
                        Description:{' '}
                        <Text style={styles.value}>
                            {interaction.description}
                        </Text>
                    </Text>
                    <Text style={styles.label}>
                        Interacting Drugs:{' '}
                        <Text style={styles.value}>
                            {interaction.interactingDrugs.join(', ')}
                        </Text>
                    </Text>
                </View>
            ))}
        </View>
    )
}

export default Drug
