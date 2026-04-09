import { useShallow } from "zustand/shallow"
import { useExecutorFiltersStore } from "./useExecutorFiltersStore"
import { IExecutor } from "../lib/ExecutorTypes"
import { useEffect, useMemo } from "react"
import { useExecutorsStore } from "./useExecutorsStore"
import { useSelectedExecutorsStore } from "./useSelectedExecutorsStore"

export interface ExecutorFilters {
	members: string[]
	isBrigade: boolean
	departmentId: number | null
}

type TFilterKey = keyof ExecutorFilters

type TFilteredFunction = {
	[K in TFilterKey]: (
		executors: IExecutor[],
		args: ExecutorFilters[K],
	) => IExecutor[]
}

// если хотя бы 1 из участников имеет хотя бы 1 подстроку с любым из участников фильтре, то выводим
const filterByMembers: TFilteredFunction["members"] = (executors, members) => {
	if (members.length === 0) {
		return executors
	}
	return executors.filter((executor) =>
		executor.members.some((executorMember) =>
			members.some((filterMember) =>
				executorMember.includes(filterMember),
			),
		),
	)
}

const filterByIsBrigade: TFilteredFunction["isBrigade"] = (
	executors,
	isBrigade,
) => {
	return executors.filter((executor) => executor.isBrigade === isBrigade)
}

const filterByDepartmentId: TFilteredFunction["departmentId"] = (
	executors,
	departmentId,
) => {
	if (departmentId === null) {
		return executors
	}
	return executors.filter(
		(executor) => executor.department.id === departmentId,
	)
}

const FilterFunction: TFilteredFunction = {
	members: filterByMembers,
	isBrigade: filterByIsBrigade,
	departmentId: filterByDepartmentId,
}

export const filterExecutors = <T extends TFilterKey>(
	filterKeys: T[],
	executors: IExecutor[],
	filterArgs: ExecutorFilters,
): IExecutor[] => {
	return filterKeys.reduce((filteredExecutors, filterKey) => {
		return FilterFunction[filterKey](
			filteredExecutors,
			filterArgs[filterKey],
		)
	}, executors)
}

export const useFilteredExecutor = () => {
	const filterArgs = useExecutorFiltersStore(
		useShallow((state) => ({
			isBrigade: state.isBrigade,
			members: state.members,
			departmentId: state["departmentId"],
		})),
	)
	const executors = useExecutorsStore((state) => state.executors)

	const filteredExecutors = useMemo(() => {
		return filterExecutors(
			["members", "isBrigade", "departmentId"],
			executors,
			filterArgs,
		)
	}, [executors, filterArgs])

	// TODO: мб перенести в другой хук
	const selectedExecutors = useSelectedExecutorsStore(
		useShallow((state) => state.selectedExecutors),
	)
	const setSelectedExecutors = useSelectedExecutorsStore(
		(state) => state.setSelectedExecutors,
	)
	useEffect(() => {
		setSelectedExecutors(
			selectedExecutors.filter((selectedExec) =>
				filteredExecutors.includes(selectedExec),
			),
		)
	}, [selectedExecutors, setSelectedExecutors, filteredExecutors])

	return filteredExecutors
}
