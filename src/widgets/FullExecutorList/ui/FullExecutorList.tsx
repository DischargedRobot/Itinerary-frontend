import { memo } from "react"
import { ExecutorList } from "@/entities/Executors"
import { FilterExecutors } from "@/features/FilterExecutors"

const FullExecutorList = () => {
	return (
		<div className="flex flex-col gap-3">
			<FilterExecutors />
			<ExecutorList />
		</div>
	)
}

export default memo(FullExecutorList)
