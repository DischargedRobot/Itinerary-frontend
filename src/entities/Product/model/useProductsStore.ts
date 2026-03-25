import { create } from "zustand";
import { IProduct } from "../lib";

interface IProductSore {
    products: IProduct[]
    setProducts: (newProducts: IProduct[]) => void
}

export const useProductStore = create<IProductSore>(set => ({
    products: [{id: 1, name: 'Воздушный анализатор', audCode: 'КСИУ', divisionId: 1, kit: 30, increasingKit: 150}],

    setProducts: (newProducts) => set({products: newProducts})
}))