import { useFilteredOperations } from "./useFilteredOperations"

export const useOperationTable = () => {

    const {filteredOperations: operations} = useFilteredOperations()

    return {operations}
}