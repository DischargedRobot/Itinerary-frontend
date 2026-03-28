'use client'

import './TaskLists.scss'

import { FullExecutorList } from "@/widgets/FullExecutorList"
import { FullOperationsTable } from "@/widgets/FullOperationsTable/ui"
import { FullProductTable } from "@/widgets/FullProductTable"
import { TopItineraryFilters } from '@/widgets/TopItineraryFilters'

const TaskLists = () => {

    return (
        <div className='flex flex-col gap-5 w-full'>
            <TopItineraryFilters/>
            <div className="grid grid-cols-[auto_1fr] gap-3">
                <FullExecutorList/>
                <div className='flex flex-col gap-5'>
                    <FullProductTable/>
                    <FullOperationsTable/>
                </div>
            </div>
        </div>
    )
}

export default TaskLists