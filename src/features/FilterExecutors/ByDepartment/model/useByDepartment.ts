import { executorsAPI, IExecutor, useExecutorsStore } from "@/entities/Executors"
import { enrich } from "@/shared"
import { mapAPIError } from "@/shared/api/apiError"
import { enrichAddObject, IDepartment } from "@/shared/lib"
import { useDepartmentStore } from "@/shared/model"
import { useState } from "react"
import useSWR from "swr"

export const useByDepartment = () => {

    const [value, setValue] = useState<number | null>()

    const departments = useDepartmentStore(state => state.departments)
    const setExecutors = useExecutorsStore(state => state.setExecutors)

    const {data: executorsResponce, mutate} = useSWR(
        [['executors', 'divisionId'], []], 
        () => {
            if(value) {
                return executorsAPI.getExecutorsByDepartmentId(value)
            }
            return []
        }
    )

    const handleSelect = async (departmentId: number) => {
        console.log(departmentId, 'departmentId')
        setValue(departmentId)

        const executors = await mutate(
            () => executorsAPI.getExecutorsByDepartmentId(departmentId),
            {revalidate: false}
        ).then(executorsResponse => 
            executorsResponse?.map((executor) => {
                const department = departments.find(dep => dep.id === departmentId) 
                const enrichExecutor = enrichAddObject<typeof executorsResponse[number], IDepartment>()(
                    {sourceKey: 'id', inputKey: 'departmentId'},
                    'all',
                    departments,
                    'department'
                )
                
                const {operationsIds, ...data} = enrichExecutor(executor).object
                if (department) {
                    return {
                        ...data,
                        operations: {id: operationsIds}
                    }
                }
                // если ошибка в данных (экзекьютор содержит отсутствующий айди отдела)
                throw mapAPIError(404)
                
        })) || []

        setExecutors(executors)
    }

    return { value, handleSelect, departments}
}