import { executorsAPI, useExecutorsStore } from "@/entities/Executors"
import { useEffect, useState } from "react"
import useSWR from "swr"

export const useTaskLists = () => {

    const [value, setValue] = useState()
    const setExecutors = useExecutorsStore(state => state.setExecutors)

    const {data: executorsResponce} = useSWR(
        [['executors', 'divisionId'], []], 
        () => executorsAPI.getExecutors()
    )

    // const executors

    // useEffect(() => {
    //     setExecutors()
    // }, [])
}