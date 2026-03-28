import { useEffect, useState } from "react"
import { useFilteredOperations } from "./useFilteredOperations"
import { IProduct, useProductStore } from "@/entities/Product"
import { useOperationStore } from "./useOperationStore"

export const useOperationTable = () => {

    const [isVisible, setIsVisible] = useState<boolean>()
    const setProducts = useProductStore(state => state.setProducts)
    const operations = useOperationStore(state => state.operations)
        console.log('opper', operations)

    // TODO: мб перенести в сторе продуктов? но тогда он будет зависимым от другого стора, хм...
    useEffect(() => {
        console.log('add prod', operations)
        setProducts(operations
                .map<IProduct>(operation => operation.product)
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
    }, [setProducts, operations])
    
    const {filteredOperations} = useFilteredOperations()

    return {operations: filteredOperations, isVisible, setIsVisible}
}