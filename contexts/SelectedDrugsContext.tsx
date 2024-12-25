import { createContext, useContext, FC, ReactNode, useState } from 'react'

interface SelectedDrugsContextType {
    selectedDrugIds: string[]
    addDrug: (id: string) => void
    removeDrug: (id: string) => void
}

const SelectedDrugsContext = createContext<SelectedDrugsContextType | null>(
    null
)

export const SelectedDrugsProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [selectedDrugIds, setSelectedDrugIds] = useState<string[]>([])

    const addDrug = (id: string) => {
        setSelectedDrugIds(prev => [...prev, id])
    }

    const removeDrug = (id: string) => {
        setSelectedDrugIds(prev => prev.filter(drugId => drugId !== id))
    }

    return (
        <SelectedDrugsContext.Provider
            value={{ selectedDrugIds, addDrug, removeDrug }}
        >
            {children}
        </SelectedDrugsContext.Provider>
    )
}

export const useSelectedDrugs = () => {
    const context = useContext(SelectedDrugsContext)
    if (!context) {
        throw new Error(
            'useSelectedDrugs must be used within a SelectedDrugsProvider'
        )
    }
    return context
}
