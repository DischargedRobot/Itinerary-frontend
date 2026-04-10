"use client"

import { memo } from "react"
import { useIntl } from "react-intl"
import { FilterExecutors } from "@/features/FilterExecutors"
import { FilterOperationByDate } from "@/features/FilterOperationByDate"
import { IDepartment } from "@/shared/lib"
import { useTopTaskListsFilters } from "../model/useTopTaskListsFilters"
import { FilterOperationByIsFormed } from "@/features/FilterOperationByIsFormed"

const TopTaskListsFilters = () => {
	const { handleSelect, departments, selectedValue } =
		useTopTaskListsFilters()
	const intl = useIntl()

	return (
		<div className="flex gap-3 ">
			<FilterOperationByDate />
			<FilterExecutors.ByDepartment
				options={departments}
				defaultValue={selectedValue}
				onChange={handleSelect}
				placeholder={intl.formatMessage({
					id: "department_placeholder",
				})}
			/>
			<FilterOperationByIsFormed />
		</div>
	)
}

export default memo(TopTaskListsFilters)
