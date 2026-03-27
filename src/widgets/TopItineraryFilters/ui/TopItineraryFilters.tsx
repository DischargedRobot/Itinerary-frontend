'use client'

import { useExecutorFiltersStore } from "@/entities/Executors"
import { FilterExecutors } from "@/features/FilterExecutors"
import { DropdownOption } from "@/features/FilterExecutors/ByDepartment/ui/ByDepartment"
import { FilterOperationByDate } from "@/features/FilterOperationByDate"
import { IDepartment } from "@/shared/lib"
import { useDepartmentStore } from "@/shared/model/Department/useDepartmentStore"
import { useMemo, useState } from "react"
import { useShallow } from "zustand/shallow"

export const TopItineraryFilters = () => {
    // TODO: спрятать в виджет
    const [selectedValue, setSelectedValue] = useState<IDepartment['id'] | null>(null)

    const departmentsRaw = useDepartmentStore(state => state.departments)
    
    const departments = useMemo(() => 
        departmentsRaw.map(item => ({ 
            value: item.id, 
            label: item.name 
        })),
        [departmentsRaw] 
    )
    
    const setDepForExecutors = useExecutorFiltersStore(state => state.setDepartmentId)

    const handleSelect = (value: number): void => {
        setSelectedValue(value)
        setDepForExecutors(value)
    }
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