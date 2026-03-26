import { useState } from "react"
import { useFilteredOperations } from "./useFilteredOperations"

export const useOperationTable = () => {

    const {filteredOperations: operations} = useFilteredOperations()
    const [isVisible, setIsVisible] = useState<boolean>()

    return {operations, isVisible, setIsVisible}
}