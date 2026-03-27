import { useShallow } from "zustand/shallow"
import { IProduct } from "../lib"
import { useProductFilterStore } from "./useProductFilterStore"
import { useProductStore } from "./useProductsStore"


export interface ProductFilters {
    name: string
}

type TFilterKey = keyof ProductFilters

type TFilteredFunction = {
    [K in TFilterKey]: (products: IProduct[], args: ProductFilters[K]) => IProduct[] 
}


const filterByName: TFilteredFunction['name']  = (products, name) => {
    return products.filter(product => product.name.includes(name))
}

const FilterFunction: TFilteredFunction = {
    name: filterByName,
}

const filterProduct = <T extends TFilterKey>(filters: T[], products: IProduct[], args: ProductFilters): IProduct[] => {
    return filters.reduce((filteredProducts, filter) => {
        return FilterFunction[filter](filteredProducts, args[filter])
    }, products)
}

export const useFilteredProduct = () => {

    const filterArgs = useProductFilterStore(useShallow(state => ({name: state.name})))

    const products = useProductStore(state => state.products)

    return {products: filterProduct(['name'], products, filterArgs)}
}