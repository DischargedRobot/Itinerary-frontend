'use client'

import { useExecutorFiltersStore } from "@/entities/Executors"

export const ByMembers = () => {

    const setMembers = useExecutorFiltersStore(state => state.setMembers)

    return (
    <label className="p-2 bg-[var(--foreground)] border border-[var(--stroke)] rounded-md title">
        <input
            name="executor" 
            type="search" 
            placeholder="Участники" 
            onChange={(e) => setMembers(e.target.value.split(' ').filter(member => member !== ''))}
        />
    </label>
    )
}