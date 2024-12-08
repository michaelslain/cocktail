import { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import styles from './Result.style'
import { Drug } from '../util/drugs'
import Text from './Text'

interface ResultProps {
    drug: Drug
    onSelect?: (id: string) => void
}

export const Result: FC<ResultProps> = ({ drug, onSelect }) => {
    const handlePress = () => {
        if (onSelect) onSelect(drug.id)
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Text style={styles.name}>{drug.names[0]}</Text>
            <Text style={styles.secondaryNames}>
                {drug.names.slice(1).join(', ')}
            </Text>
        </TouchableOpacity>
    )
}

export default Result
