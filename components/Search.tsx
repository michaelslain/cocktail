import { FC, useState, useMemo } from 'react'
import styles from './Search.style'
import { FlatList, TextInput, View } from 'react-native'
import { fuzzySearch } from '../util/drugs'
import { Drug } from '../util/drugs'
import { Result } from './Result'

interface SearchProps {
    onSelectDrug: (drugId: string) => void
}

const Search: FC<SearchProps> = ({ onSelectDrug }) => {
    const [query, setQuery] = useState('')

    const results = useMemo(() => fuzzySearch(query), [query])

    const handleSubmit = () => {
        if (results.length === 1) {
            onSelectDrug(results[0].id)
            setQuery('')
        }
    }

    const handleSelect = (drugId: string) => {
        onSelectDrug(drugId)
        setQuery('')
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search for a drug"
                value={query}
                onChangeText={text => setQuery(text)}
                onSubmitEditing={handleSubmit}
            />
            <FlatList
                style={styles.resultsContainer}
                data={results}
                renderItem={({ item }: { item: Drug }) => (
                    <Result drug={item} onSelect={handleSelect} />
                )}
            />
        </View>
    )
}

export default Search
