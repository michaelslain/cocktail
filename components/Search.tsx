import { FC, useState, useMemo } from 'react'
import {
    FlatList,
    TextInput,
    View,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native'
import { fuzzySearch } from '../util/drugs'
import { Drug } from '../util/drugs'
import { Result } from './Result'
import styles from '../pages/Home.style'
import { useSelectedDrugs } from '../contexts/SelectedDrugsContext'

const Search: FC = () => {
    const [query, setQuery] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const { addDrug } = useSelectedDrugs()
    const results = useMemo(() => fuzzySearch(query), [query])

    const handleSubmit = () => {
        if (results.length === 1) {
            addDrug(results[0].id)
        }
        setQuery('')
        setIsFocused(false)
        Keyboard.dismiss()
    }

    const handleSelect = (drugId: string) => {
        addDrug(drugId)
        setQuery('')
        setIsFocused(false)
        Keyboard.dismiss()
    }

    const handleDismiss = () => {
        setIsFocused(false)
        setQuery('')
        Keyboard.dismiss()
    }

    if (isFocused) {
        return (
            <TouchableWithoutFeedback onPress={handleDismiss}>
                <View style={styles.searchContainerFocused}>
                    <TouchableWithoutFeedback>
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <TextInput
                                style={[
                                    styles.searchInput,
                                    styles.searchInputFocused,
                                ]}
                                placeholder="Search for a drug..."
                                placeholderTextColor="#999"
                                value={query}
                                onChangeText={text => setQuery(text)}
                                onSubmitEditing={handleSubmit}
                                onBlur={handleDismiss}
                                blurOnSubmit
                                returnKeyType="search"
                                autoFocus
                            />
                            <FlatList
                                style={styles.searchResults}
                                contentContainerStyle={{
                                    paddingBottom:
                                        Platform.OS === 'ios' ? 300 : 200,
                                }}
                                data={results}
                                renderItem={({ item }: { item: Drug }) => (
                                    <Result
                                        drug={item}
                                        onSelect={handleSelect}
                                    />
                                )}
                                keyboardShouldPersistTaps="handled"
                                removeClippedSubviews={false}
                                initialNumToRender={20}
                                maxToRenderPerBatch={20}
                                windowSize={21}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search for a drug..."
                placeholderTextColor="#999"
                value={query}
                onChangeText={text => setQuery(text)}
                onSubmitEditing={handleSubmit}
                onBlur={handleDismiss}
                blurOnSubmit
                returnKeyType="search"
                onFocus={() => setIsFocused(true)}
            />
        </View>
    )
}

export default Search
