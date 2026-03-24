import { useShallow } from "zustand/shallow"
import { useExecutorFiltersStore } from "./useExecutorFiltersStore"
import { IExecutor } from "../lib/ExecutorTypes"
import { useCallback, useMemo } from "react"

interface ExecutorFilters {
    members: string[]
    isBrigade: boolean
}

type TFilterKey = keyof ExecutorFilters

type TFilteredFunction = {
    [K in TFilterKey]: (executors: IExecutor[], args: ExecutorFilters[K]) => IExecutor[] 
}

const filterByMembers: TFilteredFunction['members']  = (executors, members) => {
    if (members.length === 0) {
        return executors
    }
    
    return executors.filter(executor => members.some(member => executor.members.includes(member)))
}

const filterByIsBrigade: TFilteredFunction['isBrigade']  = (executors, isBrigade) => {
    return executors.filter(executor => executor.isBrigade === isBrigade)
}

const FilterFunction: TFilteredFunction = {
    members: filterByMembers,
    isBrigade: filterByIsBrigade,
}

export const useExecutorFilter = (executors: IExecutor[]) => {

    const filterArgs = useExecutorFiltersStore(useShallow(state => ({isBrigade: state.isBrigade, members: state.members})))

    const filterExecutors =  useCallback(<T extends TFilterKey>(filterKeys: T[], executors: IExecutor[]): IExecutor[] => {
        return filterKeys.reduce((filteredExecutors, filterKey) => {
            return FilterFunction[filterKey](filteredExecutors, filterArgs[filterKey])
        }, executors)
    }, [filterArgs])
    
    return useMemo(() => {
        return filterExecutors(['members', 'isBrigade'], executors)
    }, [executors, filterExecutors])
}