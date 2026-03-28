import { create } from "zustand";
import { IProduct } from "../lib";

interface IProductSore {
    products: IProduct[]
    
    setProducts: (newProducts: IProduct[]) => void
    addProducts: (newProducts: IProduct[]) => void
}

export const useProductStore = create<IProductSore>(set => ({
    products: [{id: 1, name: 'Воздушный анализатор', audCode: 'КСИУ', departmentId: 1, kit: 30, increasingKit: 150}],

    setProducts: (products) => set({products}),
    addProducts: (newProducts) =>  set((state) => {
        const newProductIds = newProducts.map(newProduct => newProduct.id)
        const newProductIdsInCurrent = state.products.filter(product => newProductIds.includes(product.id)) // какие изделия уже есть в текущем списке
        
        if (newProductIdsInCurrent.length === newProducts.length) { // если все уже есть, то не обновляем
            return {}
        }

        return {products: [...state.products.filter(product => newProductIds.includes(product.id)), ...newProducts]}
    })
}))