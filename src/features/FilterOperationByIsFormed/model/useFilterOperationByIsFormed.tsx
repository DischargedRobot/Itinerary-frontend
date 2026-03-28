import { useOperationFiltersStore } from "@/entities/Operations"
import { useState } from "react"

export const useFilterOperationByIsFormed = () => {

    const [isChecked, setIsChecked] = useState<boolean>(false)
    const setIsFormed = useOperationFiltersStore(state => state.setIsFormed)

    const handleChange = () => {
        setIsFormed(!isChecked)
        setIsChecked(prev => !prev)
    }    
    return {
        isChecked,
        handleChange
    }
}