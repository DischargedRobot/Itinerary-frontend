import { useShallow } from "zustand/shallow"
import { useOperationFiltersStore } from "./useOperationFiltersStore"
import { useOperationStore } from "./useOperationStore"
import { useMemo } from "react"
import { IOperation } from "../lib"

export interface IOperationFilters {
    productIds: number[]
    isFormed: boolean 
}

type TOperationFilterKey = keyof IOperationFilters

type TOperationFilterFunctions = {
    [K in TOperationFilterKey]: (operations: IOperation[], args: IOperationFilters[K]) => IOperation[]
}

const filterByProductsIds: TOperationFilterFunctions['productIds'] = (operations, productIds) => {
    if (productIds.length) {
        return operations
    }
    return operations.filter(operation => productIds.includes(operation.product.id))
}

const filterByIsFormed: TOperationFilterFunctions['isFormed'] = (operations, isFormed) => {
    return operations.filter(operation => operation.isFormed == isFormed)
}

const OperationFilterFunction: TOperationFilterFunctions = {
    productIds: filterByProductsIds,
    isFormed: filterByIsFormed,
}
    // extends чтобы тайп скрипт понял что filter одинаковый при подстановки в function и  args
const filter = <T extends TOperationFilterKey>(filters: T[], operations: IOperation[], filterArgs: IOperationFilters): IOperation[] => {
    return filters.reduce((filteredOperations, filter) => {
        return OperationFilterFunction[filter](filteredOperations, filterArgs[filter])
    }, operations)
}

export const useFilteredOperations = () => {

    const filters = useOperationFiltersStore(useShallow(state => state.filterArgs()))
    const operations = useOperationStore(useShallow(state => state.operations))

    return useMemo(() => {
        return {filteredOperations: filter(['isFormed', 'productIds'],operations, filters)}
    },[operations, filters])
}
