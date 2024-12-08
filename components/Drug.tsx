import { FC } from 'react'
import { View } from 'react-native'
import { Drug as DrugType } from '../util/drugs'
import styles from './Drug.style'
import { useNavigation } from '../contexts/NavigationContext'
import Button from './Button'
import Text from './Text'

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
            <Button style={styles.drugContent} onPress={handlePress}>
                <Text style={styles.primaryName}>{drug.names[0]}</Text>
                <View style={styles.secondaryNameContainer}>
                    {drug.names.slice(1).map((name, index) => (
                        <Text style={styles.secondaryName} key={index}>
                            {name}
                        </Text>
                    ))}
                </View>
                <Text style={styles.type}>{drug.type}</Text>
            </Button>
            <Button style={styles.deleteButton} onPress={handleDelete}>
                Delete
            </Button>
        </View>
    )
}

export default Drug
