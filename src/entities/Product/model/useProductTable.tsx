import { useMemo } from "react"
import { useProductStore } from "./useProductsStore"

export const useProductTable = () => {

    const products = useProductStore(state => state.products)

    return useMemo(() => {
        return {products}
    }, [products])
}

