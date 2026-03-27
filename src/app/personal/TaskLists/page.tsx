import './TaskLists.scss'

import { FilterExecutors } from "@/features/FilterExecutors"
import { FilterOperationByDate } from "@/features/FilterOperationByDate"
import { FullExecutorList } from "@/widgets/FullExecutorList"
import { FullOperationsTable } from "@/widgets/FullOperationsTable/ui"
import { FullProductTable } from "@/widgets/FullProductTable"


const TaskLists = () => {

    return (
        <div className='flex flex-col gap-5 w-full'>
            <div className="flex gap-3 ">
                <FilterOperationByDate/>
                <FilterExecutors.ByDepartment/>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-3">
                <FullExecutorList/>
                <div>
                    <FullProductTable/>
                    <FullOperationsTable/>
                </div>
            </div>
        </div>
    )
}

export default TaskLists