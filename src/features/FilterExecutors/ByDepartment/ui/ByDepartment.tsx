'use client'

import { useExecutorFiltersStore } from "@/entities/Executors"



export const ByDepartment = () => {

    const setDepartmentId = useExecutorFiltersStore(state => state.setDepartmentId)

    return (
        <label className="title p-2 bg-foreground border border-stroke rounded-md hover:border-hover has-focus:border-active focus:border-active ">
            <input 
                name="department"
                type="search" 
                placeholder="Цех" 
                onChange={(e) => setDepartmentId(parseInt(e.target.value))}
            />
        </label>
    )
}