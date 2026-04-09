import { useMemo } from "react"
import { useExecutorsStore } from "@/entities/Executors/model"
import {
	filterExecutors,
	type ExecutorFilters,
} from "@/entities/Executors/model/useFilteredExecutor"

export const useSelectExecutorInTable = (
	filters?: Partial<ExecutorFilters>,
) => {
	const executors = useExecutorsStore((state) => state.executors)

	const filteredExecutors = useMemo(() => {
		if (!filters) {
			return executors
		}

		const defaultFilters: ExecutorFilters = {
			members: filters.members ?? [],
			isBrigade: filters.isBrigade ?? false,
			departmentId: filters.departmentId ?? null,
		}

		return filterExecutors(
			["members", "isBrigade", "departmentId"],
			executors,
			defaultFilters,
		)
	}, [executors, filters])

	return { executors: filteredExecutors }
}
