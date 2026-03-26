import { useMemo, useState } from "react"
import { useProductStore } from "./useProductsStore"

export const useProductTable = () => {

    const products = useProductStore(state => state.products)
    const [isVisible, setIsVisible] = useState<boolean>()
    return {products,isVisible,setIsVisible}
    
}

