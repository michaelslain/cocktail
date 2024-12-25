import { FC } from 'react'
import { View, StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import { Drug as DrugType } from '../util/drugs'
import styles from './Drug.style'
import { useNavigation } from '../contexts/NavigationContext'
import Button from './Button'
import Text from './Text'

interface DrugProps {
    drug: DrugType
    deleteById: (id: string) => void
    style?: StyleProp<ViewStyle>
}

export const Drug: FC<DrugProps> = ({ drug, deleteById, style }) => {
    const { setCurrentDrugId, setCurrentPage } = useNavigation()

    const handlePress = () => {
        setCurrentDrugId(drug.id)
        setCurrentPage('drug')
    }

    return (
        <TouchableOpacity
            style={[styles.container, style]}
            onPress={handlePress}
        >
            <View style={styles.drugContent}>
                <Text style={styles.primaryName}>{drug.names[0]}</Text>
                <Text style={styles.type}>{drug.type}</Text>
            </View>
            <Button
                style={styles.deleteButton}
                onPress={() => deleteById(drug.id)}
            >
                <Text style={styles.deleteButtonText}>×</Text>
            </Button>
        </TouchableOpacity>
    )
}

export default Drug
