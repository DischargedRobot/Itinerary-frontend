import { categoryAPI, useCategoriesStore } from "@/entities/Category"
import { departmentAPI, useDepartmentStore } from "@/entities/Department"
import { equipmentAPI, useEquipmentStore } from "@/entities/Equipment"
import { useExecutorsStore } from "@/entities/Executors"
import { executorsAPI } from "@/entities/Executors"
import { productAPI, useProductStore } from "@/entities/Product"
import { useEffect } from "react"

export const useInitial = () => {

    const setExecutors = useExecutorsStore(state => state.setExecutors)
    const setCategories = useCategoriesStore(state => state.setCategories)
    const setDepartments = useDepartmentStore(state => state.setDepartments)
    const setEquipment = useEquipmentStore(state => state.setEquipments)
    const setProducts = useProductStore(state => state.setProducts)
    useEffect(() => {
        let executors
        let departments
        
        Promise.all([
            categoryAPI.getCategories().then(resolve => console.log(resolve)),
            equipmentAPI.getEquipments().then(equipments => console.log(equipments)),
            productAPI.getProducts().then(products => console.log(products)),
            // executorsAPI.getExecutors().then(resolve => executors = resolve), 
            departmentAPI.getDepartments().then(resolve => departments = resolve),
        ]).then(resolves => console.log(resolves))
        .catch(reject => console.log(reject))
        console.log(executors, departments)
    }, [])

    return ({

    })
}