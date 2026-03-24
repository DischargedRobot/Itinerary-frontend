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
        <div className="flex items-center border-blue-300 border-solid border-2 rounded-lg bg-white gap-4 mx-auto p-[12px] max-w-[274px]">
            <div>
                <Avatar/>
            </div>
            <ul className="flex flex-col max-h-100 w-full overflow-y-scroll">
                {executor.members.map(member => {
                    return (
                        <li key={member}>
                            <ExecutorName  name={member}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}