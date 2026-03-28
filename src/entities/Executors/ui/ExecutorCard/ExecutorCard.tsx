'use client'

import './ExecutorCard.scss'

import { ExecutorName } from "@/shared/ui/ExecutorName"
import { IExecutor } from "../../lib/ExecutorTypes"
// import { useState } from "react"
import Avatar from "@/shared/ui/Avatar/Avatar"
import { SelectCircle } from '@/shared/ui'
import { useExecutorCard } from '../../model'

interface Props {
    executor: IExecutor
}

export const ExecutorCard = (props: Props) => {

    const {
        executor
    } = props

    const { 
        isSelected, 
        handleSelect,
    } = useExecutorCard()

    return (
        <div className={`${isSelected ? 'shadow-lg border-blue-600' : 'border-blue-200 hover:border-blue-400'} flex items-center gap-4 p-3 mx-auto max-w-68.5  border-solid border-2 rounded-lg bg-white`}>
            <div 
                className='relative cursor-pointer'
                onMouseDown={(e) => {e.preventDefault()}} 
                onClick={() => handleSelect(executor)}
                >
                <Avatar size={64}/>
                <label className='absolute bottom-0 right-0 flex w-4!'>
                    <SelectCircle 
                        isSelected={isSelected} 
                    />
                </label>
            </div>
            <ul className="card__members text flex flex-col gap-2 max-h-25 w-full overflow-y-auto scroll-black px-2">
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