import { ExecutorCard } from "../../ExecutorCard/ui/ExecutorCard"
import { useExecutorsStore } from "../model"

export const ExecutorList = () => {
    
    const executors = useExecutorsStore(state => state.executors)

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