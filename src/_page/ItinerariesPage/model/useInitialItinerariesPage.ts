import { useItineraryStore } from "@/entities/Itinerary/model"
import { productAPI, useProductStore } from "@/entities/Product"
import { APIError, useAPIErrorHandler } from "@/shared/api"
import { useCallback, useEffect } from "react"
import { mutate } from "swr"
import { useShallow } from "zustand/shallow"

export const useInitialItinerariesPage = () => {
	const setProducts = useProductStore((state) => state.setProducts)

	const apiErrorCatcher = useAPIErrorHandler()
	const loadProducts = useCallback(
		async (count = 100, page = 1) => {
			try {
				await mutate(
					[
						["products", "count", "page"],
						["all", count, page],
					],
					() => productAPI.getProducts(count, page),
					{ revalidate: false },
				).then((serverProducts) => {
					if (serverProducts) {
						setProducts(serverProducts)
					}
				})
			} catch (error) {
				apiErrorCatcher(error as APIError)
			}
		},
		[setProducts, apiErrorCatcher],
	)

	const setItineraries = useItineraryStore(
		useShallow((state) => state.setItineraries),
	)

	useEffect(() => {
		setItineraries([])
	}, [setItineraries])

	useEffect(() => {
		loadProducts(100, 1)
	}, [loadProducts])
}
