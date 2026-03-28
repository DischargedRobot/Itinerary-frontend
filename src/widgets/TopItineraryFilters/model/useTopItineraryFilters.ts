import { useExecutorFiltersStore } from "@/entities/Executors"
import { IDepartment } from "@/shared/lib"
import { useDepartmentStore } from "@/shared/model/Department/useDepartmentStore"
import { useMemo, useState } from "react"

export const useTopItineraryFilters = () => {
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

    const handleSelect = (value: number | null): void => {
        setSelectedValue(value)
        setDepForExecutors(value)
    }

    return {
        selectedValue,
        departments,
        handleSelect,
    }
}