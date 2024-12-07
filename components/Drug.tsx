import { FC } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Drug as DrugType } from '../util/drugs'
import styles from './Drug.style'
import { useNavigation } from '../contexts/NavigationContext'

interface DrugProps {
    drug: DrugType
    deleteById: (id: string) => void
}

export const Drug: FC<DrugProps> = ({ drug, deleteById }) => {
    const { setCurrentDrugId, setCurrentPage } = useNavigation()

    const handlePress = () => {
        setCurrentDrugId(drug.id)
        setCurrentPage('drug')
    }

    const handleDelete = () => {
        deleteById(drug.id)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.drugContent} onPress={handlePress}>
                <Text style={styles.primaryName}>{drug.names[0]}</Text>
                <View style={styles.secondaryNameContainer}>
                    {drug.names.slice(1).map((name, index) => (
                        <Text style={styles.secondaryName} key={index}>
                            {name}
                        </Text>
                    ))}
                </View>
                <Text style={styles.type}>{drug.type}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}
            >
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Drug
