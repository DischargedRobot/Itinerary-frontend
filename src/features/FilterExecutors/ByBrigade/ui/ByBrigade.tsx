'use client'

import { useExecutorFiltersStore } from "@/entities/Executors"

export const ByBrigade = () => {

    const setIsBrigade = useExecutorFiltersStore(state => state.setIsBrigade)
    
    return (
        <label className="flex items-center gap-2 title">
            <span>Бригада:</span>
            <input type="checkbox" onChange={e => setIsBrigade(e.target.checked)}/>
        </label>
    )
} 