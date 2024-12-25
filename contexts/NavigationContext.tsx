import React, {
    createContext,
    useContext,
    useState,
    FC,
    ReactNode,
} from 'react'

type Page = 'home' | 'drug' | 'interactions'

interface NavigationContextType {
    currentPage: Page
    setCurrentPage: (page: Page) => void
    currentDrugId: string | null
    setCurrentDrugId: (id: string | null) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(
    undefined
)

export const useNavigation = () => {
    const context = useContext(NavigationContext)
    if (!context) {
        throw new Error(
            'useNavigation must be used within a NavigationProvider'
        )
    }
    return context
}

interface NavigationProviderProps {
    children: ReactNode
}

export const NavigationProvider: FC<NavigationProviderProps> = ({
    children,
}) => {
    const [currentPage, setCurrentPage] = useState<Page>('home')
    const [currentDrugId, setCurrentDrugId] = useState<string | null>(null)

    return (
        <NavigationContext.Provider
            value={{
                currentPage,
                setCurrentPage,
                currentDrugId,
                setCurrentDrugId,
            }}
        >
            {children}
        </NavigationContext.Provider>
    )
}
