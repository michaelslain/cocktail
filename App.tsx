import { FC } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native'
import { NavigationProvider } from './contexts/NavigationContext'
import Navigation from './components/Navigation'
import styles from './App.style'

const App: FC = () => {
    return (
        <NavigationProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar style="auto" />
                <Navigation />
            </SafeAreaView>
        </NavigationProvider>
    )
}

export default App
