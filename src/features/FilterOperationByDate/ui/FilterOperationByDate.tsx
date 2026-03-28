'use client'

import { useOperationFiltersStore } from "@/entities/Operations"
import { SelectDate } from "@/features/SelectDate/ui/SelectData"

export const FilterOperationByDate = () => {

    const setFromDateExecution = useOperationFiltersStore(state => state.setFromDate)
    const setToDateExecution = useOperationFiltersStore(state => state.setToDate)

    return (
        <div className="flex items-center gap-1.5 title ">
            Дата
            <SelectDate
                onSelect={(fromDate) => setFromDateExecution(fromDate)}
            />
            :
            <SelectDate
                onSelect={(toDate) => setToDateExecution(toDate)}
            />
        </div>
    )
}