import { FC } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native'
import { NavigationProvider } from './contexts/NavigationContext'
import { SelectedDrugsProvider } from './contexts/SelectedDrugsContext'
import Navigation from './components/Navigation'
import styles from './App.style'

const App: FC = () => {
    return (
        <NavigationProvider>
            <SelectedDrugsProvider>
                <SafeAreaView style={styles.container}>
                    <StatusBar style="auto" />
                    <Navigation />
                </SafeAreaView>
            </SelectedDrugsProvider>
        </NavigationProvider>
    )
}

export default App
