import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

type Styles = {
    interactionCard: ViewStyle
    interactionType: TextStyle
    interactionDescription: TextStyle
    involvedDrugs: TextStyle
}

export default StyleSheet.create<Styles>({
    interactionCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    interactionType: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        color: '#ff4444',
    },
    interactionDescription: {
        fontSize: 16,
        marginBottom: 12,
        lineHeight: 22,
    },
    involvedDrugs: {
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
    },
})
