import { useProductStore } from "./useProductsStore"

export const useFilteredProduct = () => {

    const products = useProductStore(state => state.products)

    return products
}