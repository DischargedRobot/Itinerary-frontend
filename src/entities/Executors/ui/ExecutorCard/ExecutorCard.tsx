'use client'

import './ExecutorCard.scss'

import { ExecutorName } from "@/shared/ui/ExecutorName"
import { IExecutor } from "../../lib/ExecutorTypes"
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
        <div className={`${isSelected ? 'shadow-lg border-blue-600' : 'border-blue-200 hover:border-blue-400'} flex items-center gap-4 p-3 mx-auto max-w-68.5  border-solid border-2 rounded-lg bg-white`}>
            <div>
                <Avatar size={64}/>
                <label>
                    <span>Выдели</span>
                    <input 
                        className='hidden' 
                        type="checkbox" 
                        onChange={() => {console.log('sss');setIsSelected(prev => !prev)}}
                    />
                </label>
            </div>
            <ul className="card__members flex flex-col gap-2 max-h-25 w-full overflow-y-auto scroll-black px-2">
                {executor.members.map(member => {
                    return (
                        <li key={member} className="w-full">
                            <ExecutorName name={member}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}