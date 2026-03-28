'use client'

import { FilterExecutors } from "@/features/FilterExecutors"
import { FilterOperationByDate } from "@/features/FilterOperationByDate"
import { IDepartment } from "@/shared/lib"
import { useTopItineraryFilters } from "../model/useTopItineraryFilters"

export const TopItineraryFilters = () => {

    const {
        handleSelect, 
        departments,
        selectedValue
    } = useTopItineraryFilters()

    return (
        <div className="flex gap-3 ">
            <FilterOperationByDate/>
            <FilterExecutors.ByDepartment<IDepartment['id']>                 
                options={departments}
                value={selectedValue}
                onChange={handleSelect}
                placeholder="Цех"
            />
        </div>
    )
}