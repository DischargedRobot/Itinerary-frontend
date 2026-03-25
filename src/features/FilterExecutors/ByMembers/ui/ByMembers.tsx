'use client'

import { useExecutorFiltersStore } from "@/entities/Executors"

export const ByMembers = () => {

    const setMembers = useExecutorFiltersStore(state => state.setMembers)

    return (
    <label>
        <input 
            type="search" 
            placeholder="Участники" 
            onChange={(e) => setMembers(e.target.value.split(' ').filter(member => member !== ''))}/>
    </label>
    )
}