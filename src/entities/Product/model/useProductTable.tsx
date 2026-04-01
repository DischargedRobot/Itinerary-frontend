import { useState } from "react"
import { useFilteredProduct } from "./useFilteredProduct"

export const useProductTable = () => {
	const { products } = useFilteredProduct()
	const [isVisible, setIsVisible] = useState<boolean>()

	return { products, isVisible, setIsVisible }
}
