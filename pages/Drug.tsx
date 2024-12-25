import { FC, useMemo } from 'react'
import { Linking, View, ScrollView } from 'react-native'
import { useNavigation } from '../contexts/NavigationContext'
import { getById } from '../util/drugs'
import styles from './Drug.style'
import Text from '../components/Text'
import HyperLink from '../components/HyperLink'
import BackButton from '../components/BackButton'
import Interaction from '../components/Interaction'

const Drug: FC = () => {
    const { currentDrugId, setCurrentPage } = useNavigation()

    if (!currentDrugId) {
        setCurrentPage('home')
        return <></>
    }

    const drug = useMemo(() => getById(currentDrugId), [currentDrugId])

    if (!drug) return null

    return (
        <View style={styles.container}>
            <ScrollView>
                <BackButton />
                <Text style={styles.primaryName}>{drug.names[0]}</Text>
                {drug.names.length > 1 && (
                    <View style={styles.secondaryNamesContainer}>
                        {drug.names.slice(1).map((name, index) => (
                            <Text style={styles.secondaryName} key={index}>
                                {name}
                            </Text>
                        ))}
                    </View>
                )}

                <Text style={styles.label}>
                    Type: <Text style={styles.value}>{drug.type}</Text>
                </Text>

                <Text style={styles.label}>
                    Effects:{' '}
                    <Text style={styles.value}>{drug.effects.join(', ')}</Text>
                </Text>

                <Text style={styles.label}>
                    Harm Reduction Tips:{' '}
                    <Text style={styles.value}>
                        {drug.harmReductionTips.join(', ')}
                    </Text>
                </Text>

                {drug.halfLife && (
                    <Text style={styles.label}>
                        Half Life:{' '}
                        <Text style={styles.value}>{drug.halfLife}</Text>
                    </Text>
                )}

                {drug.onsetTime && (
                    <Text style={styles.label}>
                        Onset Time:{' '}
                        <Text style={styles.value}>{drug.onsetTime}</Text>
                    </Text>
                )}

                {drug.testingKit && (
                    <Text style={styles.label}>
                        Testing Kit:{' '}
                        <HyperLink
                            style={styles.link}
                            onPress={() => Linking.openURL(drug.testingKit!)}
                        >
                            {drug.testingKit}
                        </HyperLink>
                    </Text>
                )}

                {drug.lacingPrevalence !== null && (
                    <Text style={styles.label}>
                        Lacing Prevalence:{' '}
                        <Text style={styles.value}>
                            {drug.lacingPrevalence}%
                        </Text>
                    </Text>
                )}

                {drug.interactions.length > 0 && (
                    <>
                        <Text style={styles.sectionHeader}>Interactions</Text>
                        {drug.interactions.map((interaction, index) => (
                            <Interaction
                                key={index}
                                interaction={interaction}
                            />
                        ))}
                    </>
                )}
            </ScrollView>
        </View>
    )
}

export default Drug
