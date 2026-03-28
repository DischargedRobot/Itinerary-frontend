import { IProduct, useProductStore } from "@/entities/Product"
import { useState } from "react"
import { IExecutor } from "../lib"

export const useExecutorCard = () => {

    const [isSelected, setIsSelected] = useState<boolean>(false)
    
    const addProduct = useProductStore(state => state.addProducts)

    const handleSelect = (executor: IExecutor) => {

        // фильтруем перед тем как отрпавить, чтобы 
        // не было дупликатов в изделиях, т.к. операции могут быть привязаны к одинаковому изделию
        addProduct(executor.operations
            .map<IProduct>(operation => operation.product)
            .reduce<{currentIds: number[], uniqProduct: IProduct[]}>(
                (currentProduct, product) => {
                    if (currentProduct.currentIds.includes(product.id))
                        return currentProduct
                    return currentProduct
                    }, 
                    {
                        currentIds: [],
                        uniqProduct: [],
                    }
                ).uniqProduct)

        addProduct(Array.from(new Set(executor.operations.map(operation => JSON.stringify(operation.product)))).map(product => JSON.parse(product)))
    }
    
    return {
        isSelected,
        setIsSelected,
        handleSelect,
    }
}