import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 10,
    },
    dangerLevel: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20,
        textAlign: 'center',
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
    },
    interactionsContainer: {
        flex: 1,
    },
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
