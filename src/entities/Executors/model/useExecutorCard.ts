import { useState } from "react"
import { IExecutor } from "../lib"
import { useSelectedExecutorsStore } from "./useSelectedExecutorsStore"
import { mutate, useSWRConfig} from 'swr'

import { IOperation, operationAPI } from "@/entities/Operations"
import { useExecutorsStore } from "./useExecutorsStore"
import { enrichAddObject, IDepartment } from "@/shared/lib"
import { useDepartmentStore } from "@/shared/model"
import { execFile } from "child_process"
import { useCategoriesStore } from "@/entities/Category"
import { useOperationTypeStore } from "@/entities/OperationType/model"
import { useEquipmentStore } from "@/entities/Equipment"
import { mapAPIError } from "@/shared/api/apiError"
import { useProductStore } from "@/entities/Product"
export const useExecutorCard = () => {

    const [isSelected, setIsSelected] = useState<boolean>(false)
    const { cache } = useSWRConfig() // получаем доступ к кэшу
    // const addProducts = useProductStore(state => state.addProducts)
    // const removeProducts = useProductStore(state => state.removeProducts)

    const addSelectedExecutor = useSelectedExecutorsStore(state => state.addSelectedExecutor)
    const removeSelectedExecutor = useSelectedExecutorsStore(state => state.removeSelectedExecutor)

    // const{ mutate } = useSWR([['operations','executorId'], ['byExecutor', executorId]])
    const updateExecutor = useExecutorsStore(state => state.updateExecutor)
    const departments = useDepartmentStore(state => state.departments)
    const categories = useCategoriesStore(state => state.categories)
    const operationTypes = useOperationTypeStore(state => state.operationTypes)
    const equipments = useEquipmentStore(state => state.equipments)
    const products = useProductStore(state => state.products)


    const handleSelect = async (executor: IExecutor) => {
        const cachedData = cache.get([['operations','executorId'], ['byExecutor', executor.id]].toString());
        if (!cachedData) {
            const executorOperations = await mutate(
                [['operations','executorId'], ['byExecutor', executor.id]].toString(),
                () => operationAPI.getOperationByExecutorId(executor.id),
                {revalidate: false}
            )   
            
            console.log(executorOperations, 'execu oper')
            const operation = executorOperations?.map( executorOper => {
                // можно и через энричи, впринципе
                const department = departments.find(dep => dep.id === executorOper.departmentId)
                const equipment = equipments.find(equip => equip.id === executorOper.equipmentId)
                const category = categories.find(categorie => categorie.id === executorOper.categoryId)
                const operationType = operationTypes.find(operationType => operationType.id === executorOper.typeId)
                // addProducts([executorOper.product])
                console.log(department, departments, equipment,category, operationType, executorOper.product, products, 'no error',executorOper)
                
                if (department && equipment && category && operationType) {
                    const {departmentId, equipmentId, categoryId, typeId, ...withoutIds} = executorOper
                    return {...withoutIds, department, equipment, category, type: operationType}
                }

                console.log(department, departments, equipment,category, operationType, executorOper.product, products, 'error',executorOper)
                // ошибка т.к. у нас неизвестный айди (м.б. делать тогда повтороный запрос этих данных)
                throw mapAPIError(404)
            })

            updateExecutor({operations: operation }, executor.id)
        // console.log(cachedData, 'nootcache', executorOperations)
        }
        // console.log(cachedData, 'cache', executorOperations)

        if (!isSelected) {
            setIsSelected(true)
            // фильтруем перед тем как отрпавить, чтобы 
            // не было дупликатов в изделиях, т.к. операции могут быть привязаны к одинаковому изделию
            addSelectedExecutor(executor)
            // addProduct(Array.from(new Set(executor.operations.map(operation => JSON.stringify(operation.product)))).map(product => JSON.parse(product)))
            console.log('selec', executor)
        } else {
            setIsSelected(false)
            console.log('unselec', executor)

            removeSelectedExecutor(executor)
        }

    }

    return {
        isSelected,
        setIsSelected,
        handleSelect,
    }
}