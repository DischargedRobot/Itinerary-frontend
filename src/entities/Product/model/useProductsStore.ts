import { create } from "zustand"
import { IProduct } from "../lib"

interface IProductSore {
	products: IProduct[]

	setProducts: (newProducts: IProduct[]) => void
	addProducts: (newProducts: IProduct[]) => void
	removeProducts: (removedProducts: IProduct[]) => void
}

export const useProductStore = create<IProductSore>((set) => ({
	products: [],

	setProducts: (products) => set({ products }),
	addProducts: (newProducts) =>
		set((state) => {
			const newProductIds = newProducts.map((newProduct) => newProduct.id)
			const withoutNewProducts = state.products.filter(
				(product) => !newProductIds.includes(product.id),
			) // какие изделия уже есть в текущем списке

			if (
				withoutNewProducts.length + newProducts.length ===
				newProducts.length
			) {
				// если все уже есть, то не обновляем
				return {}
			}

			return { products: [...withoutNewProducts, ...newProducts] }
		}),
	removeProducts: (removedProducts) =>
		set((state) => {
			const removedProductsIds = removedProducts.map((prod) => prod.id)
			const withoutRemovedProducts = state.products.filter(
				(prod) => !removedProductsIds.includes(prod.id),
			)
			console.log(removedProductsIds, "withour", withoutRemovedProducts)
			if (withoutRemovedProducts.length === state.products.length) {
				return {}
			}
			return { products: withoutRemovedProducts }
		}),
}))
