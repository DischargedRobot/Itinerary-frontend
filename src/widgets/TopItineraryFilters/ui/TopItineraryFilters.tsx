"use client"

import { useIntl } from "react-intl"
import { FilterExecutors } from "@/features/FilterExecutors"
import { FilterOperationByDate } from "@/features/FilterOperationByDate"
import { IDepartment } from "@/shared/lib"
import { useTopItineraryFilters } from "../model/useTopItineraryFilters"
import { FilterOperationByIsFormed } from "@/features/FilterOperationByIsFormed"

export const TopItineraryFilters = () => {
	const { handleSelect, departments, selectedValue } =
		useTopItineraryFilters()
	const intl = useIntl()

	return (
		<div className="flex gap-3 ">
			<FilterOperationByDate />
			<FilterExecutors.ByDepartment<IDepartment["id"]>
				options={departments}
				value={selectedValue}
				onChange={handleSelect}
				placeholder={intl.formatMessage({
					id: "department_placeholder",
				})}
			/>
			<FilterOperationByIsFormed />
		</div>
	)
}
