import { useShallow } from "zustand/shallow"
import { useExecutorFiltersStore } from "./useExecutorFiltersStore"
import { IExecutor } from "../lib/ExecutorTypes"
import { useCallback, useEffect, useMemo } from "react"
import { useExecutorsStore } from "./useExecutorsStore"
import { IOperation, useOperationFiltersStore, useOperationStore } from "@/entities/Operations"

export interface ExecutorFilters {
    members: string[]
    isBrigade: boolean
    departmentId: number | null
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

const filterByDepartmentId: TFilteredFunction['departmentId']  = (executors, departmentId) => {
    if (departmentId === null) {
        return executors
    }
    return executors.filter(executor => executor.department.id === departmentId)
}

const FilterFunction: TFilteredFunction = {
    members: filterByMembers,
    isBrigade: filterByIsBrigade,
    departmentId: filterByDepartmentId,
}

const filterExecutors =  <T extends TFilterKey>(filterKeys: T[], executors: IExecutor[], filterArgs: ExecutorFilters): IExecutor[] => {
    return filterKeys.reduce((filteredExecutors, filterKey) => {
        return FilterFunction[filterKey](filteredExecutors, filterArgs[filterKey])
    }, executors)
}

export const useFilteredExecutor = () => {

    const filterArgs = useExecutorFiltersStore(useShallow(state => ({isBrigade: state.isBrigade, members: state.members, departmentId: state['departmentId']})))
    const executors = useExecutorsStore(state => state.executors)

    const filteredExecutors = useMemo(() => {
        return filterExecutors(['members', 'isBrigade', 'departmentId'], executors, filterArgs)
    }, [executors, filterArgs])

    // const selectedExecutors = useExecutorsStore(state => state.selectedExecutors)
    // // если мы изменяем фильтры, то обновляем операции 
    // // Сделать так, чтобы при 
    // const setOperations = useOperationStore(state => state.setOperations)
    // useEffect(() => {
    //     console.log(selectedExecutors, 'selected')
    //     setOperations(selectedExecutors.reduce<IOperation[]>((allOperations, exec) => {
    //         allOperations.push(...exec.operations)
    //     return allOperations
    // }, []))
    // }, [selectedExecutors, setOperations])

    return filteredExecutors
}