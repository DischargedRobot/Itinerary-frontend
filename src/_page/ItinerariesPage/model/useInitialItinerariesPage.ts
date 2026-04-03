import { useItineraryStore } from "@/entities/Itinerary/model"
import { productAPI, useProductStore } from "@/entities/Product"
import { useCallback, useEffect } from "react"
import { mutate } from "swr"
import { useShallow } from "zustand/shallow"

export const useInitialItinerariesPage = () => {
	const setProducts = useProductStore((state) => state.setProducts)

	const loadProducts = useCallback(
		async (count = 100, page = 1) => {
			const serverProducts = await mutate(
				[
					["products", "count", "page"],
					["all", count, page],
				],
				() => productAPI.getProducts(count, page),
				{ revalidate: false },
			)

			if (serverProducts) {
				setProducts(serverProducts)
			}
		},
		[setProducts],
	)

	const setItineraries = useItineraryStore(
		useShallow((state) => state.setItineraries),
	)

	useEffect(() => {
		setItineraries([])
	}, [])

	useEffect(() => {
		loadProducts(100, 1)
	}, [loadProducts])
}
