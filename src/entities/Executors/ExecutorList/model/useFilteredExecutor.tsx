import { useShallow } from "zustand/shallow"
import { useExecutorFiltersStore } from "./useExecutorFiltersStore"
import { IExecutor } from "../../ExecutorCard/lib/ExecutorTypes"
import { useCallback, useMemo } from "react"
import { useExecutorsStore } from "./useExecutorsStore"

interface ExecutorFilters {
    members: string[]
    isBrigade: boolean
}

type TFilterKey = keyof ExecutorFilters

type TFilteredFunction = {
    [K in TFilterKey]: (executors: IExecutor[], args: ExecutorFilters[K]) => IExecutor[] 
}

// если хотя бы 1 из участников имеет хотя бы 1 подстроку с любым из участников фильтре, то выводим
const filterByMembers: TFilteredFunction['members']  = (executors, members) => {
    if (members.length === 0) {
        return executors
    }
    return executors.filter(executor => executor.members.some(executorMember => members.some(filterMember => executorMember.includes(filterMember))))
}

const filterByIsBrigade: TFilteredFunction['isBrigade']  = (executors, isBrigade) => {
    return executors.filter(executor => executor.isBrigade === isBrigade)
}

const FilterFunction: TFilteredFunction = {
    members: filterByMembers,
    isBrigade: filterByIsBrigade,
}

export const useFilteredExecutor = () => {

    const filterArgs = useExecutorFiltersStore(useShallow(state => ({isBrigade: state.isBrigade, members: state.members})))

    const executors = useExecutorsStore(state => state.executors)

    const filterExecutors =  useCallback(<T extends TFilterKey>(filterKeys: T[], executors: IExecutor[]): IExecutor[] => {
        return filterKeys.reduce((filteredExecutors, filterKey) => {
            return FilterFunction[filterKey](filteredExecutors, filterArgs[filterKey])
        }, executors)
    }, [filterArgs])
    
    return useMemo(() => {
        return filterExecutors(['members', 'isBrigade'], executors)
    }, [executors, filterExecutors])
}