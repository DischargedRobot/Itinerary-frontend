import { ExecutorList } from "@/entities/Executors/ExecutorList/ui/ExeutorList"
import { FilterExecutors } from "@/features/FilterExecutors"

export const FullExecutorList = () => {

    return (
        <div className="flex flex-col gap-3">
            <FilterExecutors/>
            <ExecutorList/>
        </div>
    )
} 
