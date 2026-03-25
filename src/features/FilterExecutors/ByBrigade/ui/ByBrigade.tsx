'use client'

import { useExecutorFiltersStore } from "@/entities/Executors"

export const ByBrigade = () => {

    const setIsBrigade = useExecutorFiltersStore(state => state.setIsBrigade)
    
    return (
        <label>
            Бригада:
            <input type="checkbox" onChange={e => setIsBrigade(e.target.checked)}/>
        </label>
    )
} 