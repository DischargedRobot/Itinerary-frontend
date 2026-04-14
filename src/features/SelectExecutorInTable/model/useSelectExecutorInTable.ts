import { useMemo } from "react"
import { useExecutorsStore } from "@/entities/Executors/model"
import {
	filterExecutors,
	type ExecutorFilters,
} from "@/entities/Executors/model/useFilteredExecutor"

export const useSelectExecutorInTable = (
	filters?: Pick<ExecutorFilters, "departmentId">,
) => {
	const executors = useExecutorsStore((state) => state.executors)

	const filteredExecutors = useMemo(() => {
		if (!filters) {
			return executors
		}

		const defaultFilters: Pick<ExecutorFilters, "departmentId"> = {
			departmentId: filters.departmentId ?? null,
		}

		return filterExecutors(["departmentId"], executors, defaultFilters)
	}, [executors, filters])

	return { executors: filteredExecutors }
}
