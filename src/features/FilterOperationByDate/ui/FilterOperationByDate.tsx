'use client'

import { SelectDate } from "@/features/SelectDate/ui/SelectData"

export const FilterOperationByDate = () => {

    return (
        <div className="flex items-center gap-1.5 title ">
            Дата
            <SelectDate/>
            :
            <SelectDate/>
        </div>
    )
}