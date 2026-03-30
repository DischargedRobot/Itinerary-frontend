import { categoryAPI } from "@/entities/Category"
import { departmentAPI } from "@/entities/Department"
import { useExecutorsStore } from "@/entities/Executors"
import { executorsAPI } from "@/entities/Executors"
import { useEffect } from "react"

export const useInitial = () => {

    const setExecutors = useExecutorsStore(state => state.setExecutors)

    useEffect(() => {
        let executors
        let departments
        
        Promise.all([
            categoryAPI.getCategories().then(resolve => console.log(resolve)),
            executorsAPI.getExecutors().then(resolve => executors = resolve), 
            departmentAPI.getDepartments().then(resolve => departments = resolve)
        ]).then(resolves => console.log(resolves))
        .catch(rejects => console.log(rejects[0], rejects[1]))
        .then()
        console.log(executors, departments)
    }, [])

    return ({

    })
}