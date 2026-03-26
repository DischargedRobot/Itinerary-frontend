'use client'

import { useExecutorFiltersStore } from "@/entities/Executors"



export const ByDepartment = () => {

    const setDepartmentId = useExecutorFiltersStore(state => state.setDepartmentId)

    return (
        <label className="p-2 bg-[var(--foreground)] border border-[var(--stroke)] rounded-md title">
            <input 
                name="department"
                type="search" 
                placeholder="Цех" 
                onChange={(e) => setDepartmentId(parseInt(e.target.value))}
                // value={}
            />
        </label>
    )
}