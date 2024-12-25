import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    drugContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    primaryName: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 4,
    },
    type: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    deleteButton: {
        position: 'absolute',
        top: -8,
        right: -8,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#ff4444',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 22,
        textAlign: 'center',
    },
})
