import { useShallow } from "zustand/shallow"
import { useOperationFiltersStore } from "./useOperationFiltersStore"
import { useOperationStore } from "./useOperationStore"
import { useMemo } from "react"

export const useFilteredOperations = () => {

    const productIds = useOperationFiltersStore(useShallow(state => state.productIds))

    const operations = useOperationStore(state => state.operations)
        
    return useMemo(() => {
        const filteredOperations = operations.filter(operation => productIds.includes(operation.productId))
        return {filteredOperations}
    },[operations, productIds])
}
