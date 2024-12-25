import { FC } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '../contexts/NavigationContext'
import Button from './Button'

const BackButton: FC = () => {
    const { setCurrentPage } = useNavigation()

    return (
        <Button
            style={styles.backButton}
            onPress={() => setCurrentPage('home')}
        >
            ← Back
        </Button>
    )
}

const styles = StyleSheet.create({
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
})

export default BackButton
