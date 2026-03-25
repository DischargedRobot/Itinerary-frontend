'use client'

import { ExecutorCard } from "../../ExecutorCard/ui/ExecutorCard"
import { useExecutorsStore, useFilteredExecutor } from "../model"

export const ExecutorList = () => {
    
    const executors = useFilteredExecutor()

    return (
        <ul>
            {executors.map((executor) => {
                return <li key={executor.id}>
                    {<ExecutorCard executor={executor}/>}
                </li>
            })}
        </ul>
    )
}