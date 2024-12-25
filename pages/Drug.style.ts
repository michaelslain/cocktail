import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

type Styles = {
    container: ViewStyle
    primaryName: TextStyle
    secondaryNamesContainer: ViewStyle
    secondaryName: TextStyle
    sectionHeader: TextStyle
    label: TextStyle
    value: TextStyle
    link: TextStyle
    interactionContainer: ViewStyle
}

export default StyleSheet.create<Styles>({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    primaryName: {
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 8,
        color: '#333',
    },
    secondaryNamesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 24,
    },
    secondaryName: {
        fontSize: 16,
        color: '#666',
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 24,
        marginBottom: 16,
        color: '#333',
    },
    label: {
        fontSize: 16,
        marginBottom: 12,
        color: '#666',
    },
    value: {
        color: '#333',
        fontWeight: '500',
    },
    link: {
        color: '#007AFF',
        textDecorationLine: 'underline',
    },
    interactionContainer: {
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
})
