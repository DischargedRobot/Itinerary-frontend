'use client'

import { useExecutorFiltersStore } from "@/entities/Executors"

export const ByDepartment = () => {

    const setDepartmentId = useExecutorFiltersStore(state => state.setDepartmentId)

    return (
        <label>
            <input 
                type="search" 
                placeholder="Цех" 
                onChange={(e) => setDepartmentId(parseInt(e.target.value))}
                // value={}
            />
        </label>
    )
}