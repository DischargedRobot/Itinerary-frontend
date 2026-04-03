"use client"

import { useOperationFiltersStore } from "@/entities/Operations"
import { SelectDate } from "@/features/SelectDate/ui/SelectData"

const now = new Date()
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

export const FilterOperationByDate = () => {
	const setFromDateExecution = useOperationFiltersStore(
		(state) => state.setFromDate,
	)
	const setToDateExecution = useOperationFiltersStore(
		(state) => state.setToDate,
	)

	return (
		<div className="flex items-center gap-1.5 title ">
			Дата
			<SelectDate
				defaultDate={startOfMonth}
				onSelect={(fromDate) => setFromDateExecution(fromDate)}
			/>
			:
			<SelectDate
				defaultDate={endOfMonth}
				onSelect={(toDate) => setToDateExecution(toDate)}
			/>
		</div>
	)
}
