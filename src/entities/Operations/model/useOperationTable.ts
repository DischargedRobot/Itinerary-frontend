import { useEffect, useState } from "react"
import { useFilteredOperations } from "./useFilteredOperations"
import { IProduct, useProductStore } from "@/entities/Product"
import { useOperationStore } from "./useOperationStore"
import { useExecutorsStore } from "@/entities/Executors"
import { IOperation } from "../lib"

export const useOperationTable = () => {

    const [isVisible, setIsVisible] = useState<boolean>()
    const setProducts = useProductStore(state => state.setProducts)
        // console.log('opper', operations)
    // const {filte} = useFilteredOperations()
    // TODO: мб перенести в сторе продуктов? но тогда он будет зависимым от другого стора, хм...
    const {filteredOperations} = useFilteredOperations()

    useEffect(() => {
        console.log('add prod', filteredOperations)
        setProducts(filteredOperations
                .map<IProduct>(filteredOperations => filteredOperations.product)
                .reduce<{currentIds: number[], uniqProduct: IProduct[]}>(
                    (currentProduct, product) => {
                        if (!currentProduct.currentIds.includes(product.id)){
                            currentProduct.currentIds.push(product.id)
                            currentProduct.uniqProduct.push(product)
                            console.log('cur', currentProduct)
                        }
                        return currentProduct
                        }, 
                        {
                            currentIds: [],
                            uniqProduct: [],
                        }
                    )
                .uniqProduct)
    }, [setProducts, filteredOperations])
    

    const selectedExecutors = useExecutorsStore(state => state.selectedExecutors)
    // если мы изменяем фильтры, то обновляем операции 
    // Сделать так, чтобы при 
    const setOperations = useOperationStore(state => state.setOperations)
    useEffect(() => {
        setOperations(selectedExecutors.reduce<IOperation[]>((allOperations, exec) => {
            allOperations.push(...exec.operations)
        return allOperations
    }, []))
    }, [selectedExecutors, setOperations])

    return {operations: filteredOperations, isVisible, setIsVisible}
}