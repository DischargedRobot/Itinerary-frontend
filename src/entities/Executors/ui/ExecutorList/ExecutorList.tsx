'use client'

import { ExecutorCard } from "../ExecutorCard"
import { useFilteredExecutor } from "../../model"

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