"use client"

import { useInitial } from "@/_app"
import "./TaskLists.scss"

import { FullExecutorList } from "@/widgets/FullExecutorList"
import { FullOperationsTable } from "@/widgets/FullOperationsTable"
import { FullProductTable } from "@/widgets/FullProductTable"
import { TopTaskListsFilters } from "@/widgets/TopTaskListsFilters"
import { CreateTask } from "@/features/CreateTask"
import { DownloadTask } from "@/features/DownloadTask"
import { useFilteredProduct } from "@/entities/Product/model/useFilteredProduct"
import { useFilteredOperations } from "@/entities/Operations/model/useFilteredOperations"
import { useExecutorsForDownload } from "./model/useExecutorsForDownload"

const TaskLists = () => {
	useInitial()
	const { products } = useFilteredProduct()
	const { filteredOperations } = useFilteredOperations()
	const { executorsForDownload } = useExecutorsForDownload()

	return (
		<div className="flex flex-col gap-5 w-full">
			<TopTaskListsFilters />
			<div className="flex gap-3">
				<CreateTask />
				<DownloadTask executors={executorsForDownload} />
			</div>
			<div className="grid grid-cols-[auto_1fr] gap-3">
				<FullExecutorList />
				<div className="flex flex-col gap-5">
					<FullProductTable products={products} />
					<FullOperationsTable operations={filteredOperations} />
				</div>
			</div>
		</div>
	)
}

export default TaskLists
