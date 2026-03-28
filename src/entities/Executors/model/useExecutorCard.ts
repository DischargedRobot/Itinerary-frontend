import { useState } from "react"
import { IExecutor } from "../lib"
import { useOperationStore } from "@/entities/Operations"

export const useExecutorCard = () => {

    const [isSelected, setIsSelected] = useState<boolean>(false)
    
    // const addProducts = useProductStore(state => state.addProducts)
    // const removeProducts = useProductStore(state => state.removeProducts)
    const addOperations = useOperationStore(state => state.addOperations)
    const removeOperations = useOperationStore(state => state.removeOperations)

    const handleSelect = (executor: IExecutor) => {
            // вытаскиваем из операций продукты
            // const products = executor.operations
            //         .map<IProduct>(operation => operation.product)
            //         .reduce<{currentIds: number[], uniqProduct: IProduct[]}>(
            //             (currentProduct, product) => {
            //                 if (!currentProduct.currentIds.includes(product.id)){
            //                     currentProduct.currentIds.push(product.id)
            //                     currentProduct.uniqProduct.push(product)
            //                     console.log('cur', currentProduct)
            //                 }
            //                 return currentProduct
            //                 }, 
            //                 {
            //                     currentIds: [],
            //                     uniqProduct: [],
            //             }).uniqProduct
            // console.log('prods', products)
            if (!isSelected) {
                setIsSelected(true)
                // фильтруем перед тем как отрпавить, чтобы 
                // не было дупликатов в изделиях, т.к. операции могут быть привязаны к одинаковому изделию
                addOperations(executor.operations)

                // addProduct(Array.from(new Set(executor.operations.map(operation => JSON.stringify(operation.product)))).map(product => JSON.parse(product)))
                console.log('selec', executor.operations)
            } else {
                setIsSelected(false)
                console.log('unselec', executor.operations)

                removeOperations(executor.operations)
            }

        }


    
    
    return {
        isSelected,
        setIsSelected,
        handleSelect,
    }
}