'use client'

import './ExecutorList.scss'

import { ExecutorCard } from "../ExecutorCard"
import { useFilteredExecutor } from "../../model"
import { useEffect } from "react"
import { executorsAPI } from '../../api'

export const ExecutorList = () => {

    // TODO: в хук перенести
    // const check = async () => {
    //     const resp = await executorsAPI.getExecutor()
    //     console.log(resp)
    // }
    // check()
    const executors = useFilteredExecutor()

    useEffect(() => {

        const executorList = document.getElementById('executors-list')

        const borderAtOverflowY = () => {
            const lastChildY = executorList?.lastElementChild?.getBoundingClientRect()
            const firstChildY = executorList?.firstElementChild?.getBoundingClientRect()
            const executorListsCoordinates = executorList?.getBoundingClientRect()
            if (lastChildY && firstChildY && executorList && executorListsCoordinates) {
                // -граница иначе дёргается
                executorList.classList.toggle('executor-list_border-bottom', lastChildY.bottom-2 > executorListsCoordinates.bottom)
                executorList.classList.toggle('executor-list_border-top', firstChildY.top < executorListsCoordinates.top )
            }
        }

        executorList?.addEventListener('scroll',borderAtOverflowY)
        borderAtOverflowY()
        
        return () => {
            executorList?.removeEventListener('scroll', borderAtOverflowY)
        }
    }, [])

    return (
        <ul id='executors-list' className="executor-list flex flex-col gap-4 max-h-[400] w-min overflow-y-auto">
            {executors.map((executor) => {
                return <li key={executor.id}>
                    {<ExecutorCard executor={executor}/>}
                </li>
            })}
        </ul>
    )
}