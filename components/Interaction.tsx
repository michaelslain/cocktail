import { FC } from 'react'
import { View } from 'react-native'
import { DrugInteraction } from '../util/drugs'
import Text from './Text'
import styles from './Interaction.style'

interface InteractionProps {
    interaction: DrugInteraction
}

const Interaction: FC<InteractionProps> = ({ interaction }) => {
    return (
        <View style={styles.interactionCard}>
            <Text style={styles.interactionType}>{interaction.type}</Text>
            <Text style={styles.interactionDescription}>
                {interaction.description}
            </Text>
            <Text style={styles.involvedDrugs}>
                Drugs involved: {interaction.interactingDrugs.join(', ')}
            </Text>
        </View>
    )
}

export default Interaction
