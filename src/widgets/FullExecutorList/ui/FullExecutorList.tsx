import { ExecutorList } from "@/entities/Executors"
import { FilterExecutors } from "@/features/FilterExecutors"

export const FullExecutorList = () => {
	return (
		<div className="flex flex-col gap-3">
			<FilterExecutors />
			<ExecutorList />
		</div>
	)
}
