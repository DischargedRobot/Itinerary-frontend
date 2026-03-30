import { categoryAPI, useCategoriesStore } from "@/entities/Category"
import { departmentAPI, useDepartmentStore } from "@/entities/Department"
import { equipmentAPI, useEquipmentStore } from "@/entities/Equipment"
import { useExecutorsStore } from "@/entities/Executors"
import { executorsAPI } from "@/entities/Executors"
import { operationTypeAPI } from "@/entities/OperationType"
import { useOperationTypeStore } from "@/entities/OperationType/model"
import { productAPI, useProductStore } from "@/entities/Product"
import { PromiseAllNamed } from "@/shared/api"
import { useEffect } from "react"

export const useInitial = () => {

    const setExecutors = useExecutorsStore(state => state.setExecutors)
    const setCategories = useCategoriesStore(state => state.setCategories)
    const setDepartments = useDepartmentStore(state => state.setDepartments)
    const setEquipment = useEquipmentStore(state => state.setEquipments)
    const setProducts = useProductStore(state => state.setProducts)
    const setOperationsTypes = useOperationTypeStore(state => state.setOperationsTypes)
    useEffect(() => {
        let executors
        let departments
        
        PromiseAllNamed({
            categories: categoryAPI.getCategories(),
            equipments: equipmentAPI.getEquipments(),
            products: productAPI.getProducts(),
            operationsTypes: operationTypeAPI.getOperationsTypes(),
            // executorsAPI.getExecutors().then(resolve => executors = resolve), 
            departments: departmentAPI.getDepartments(),
        }).then(({equipments, operationsTypes, products, categories, departments}) => {
            setCategories(categories)
            // setEquipment(equipments)
            setProducts(products)
            setOperationsTypes(operationsTypes)
            setDepartments(departments)
        })
        // Promise.all([
        //     categoryAPI.getCategories().then(resolve => console.log(resolve)),
        //     equipmentAPI.getEquipments().then(equipments => console.log(equipments)),
        //     productAPI.getProducts().then(products => console.log(products)),
        //     // executorsAPI.getExecutors().then(resolve => executors = resolve), 
        //     departmentAPI.getDepartments().then(resolve => setDepartments(resolve)),
        // ]).then(resolves => setDepartments(resolves))
        // .catch(reject => console.log(reject))
        // console.log(executors, departments)
    }, [])



    return ({

    })
}