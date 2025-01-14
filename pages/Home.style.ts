import { StyleSheet, Dimensions } from 'react-native'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    searchContainer: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        width: '100%',
        maxWidth: 600,
        alignSelf: 'center',
        zIndex: 1000,
    },
    searchOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
    },
    searchContainerFocused: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 40,
        zIndex: 1000,
    },
    searchInput: {
        height: 50,
        width: '100%',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#fff',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchInputFocused: {
        width: '90%',
        maxWidth: 600,
    },
    searchResults: {
        backgroundColor: '#fff',
        width: '90%',
        maxWidth: 600,
        marginTop: 10,
        borderRadius: 15,
        maxHeight: SCREEN_HEIGHT - 150,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchResultItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        minHeight: 60,
    },
    plate: {
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: '#ffffff',
        position: 'relative',
        marginVertical: 40,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    interactionContainer: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: [{ translateX: -75 }, { translateY: -25 }],
        padding: 10,
        borderRadius: 15,
        minWidth: 150,
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    value: {},
    modalOverlay: {},
    modalContent: {},
    interactionItem: {},
    interactionType: {},
    interactionDescription: {},
    closeButton: {},
})

export default styles
