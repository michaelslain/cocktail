import { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { Drug } from '../util/drugs'
import Text from './Text'
import styles from '../pages/Home.style'

interface ResultProps {
    drug: Drug
    onSelect: (drugId: string) => void
}

export const Result: FC<ResultProps> = ({ drug, onSelect }) => {
    return (
        <TouchableOpacity
            style={styles.searchResultItem}
            onPress={() => onSelect(drug.id)}
        >
            <Text style={{ fontSize: 16, fontWeight: '600' }}>
                {drug.names[0]}
            </Text>
            {drug.names.length > 1 && (
                <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
                    {drug.names.slice(1).join(', ')}
                </Text>
            )}
        </TouchableOpacity>
    )
}

export default Result
