'use client'

import { ExecutorName } from "@/shared/ui/ExecutorName"
import { IExecutor } from "../lib/ExecutorTypes"
import { useState } from "react"
import Avatar from "@/shared/ui/Avatar/Avatar"

interface Props {
    executor: IExecutor
}

export const ExecutorCard = (props: Props) => {

    const {
        executor
    } = props

    const [isSelected, setIsSelected] = useState<boolean>(false)

    return (
        <div className={`${isSelected ? 'shadow-lg border-blue-500' : ''} flex items-center gap-4 p-3 mx-auto max-w-68.5 border-blue-200 border-solid border-2 rounded-lg bg-white  `}>
            <div>
                <Avatar/>
                <label>
                    <span>Выдели</span>
                    <input className='hidden' type="checkbox" onChange={() => {console.log('sss');setIsSelected(prev => !prev)}}/>
                </label>
            </div>
            <ul className="flex flex-col max-h-100 w-full overflow-y-auto">
                {executor.members.map(member => {
                    return (
                        <li key={member}>
                            <ExecutorName name={member}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}