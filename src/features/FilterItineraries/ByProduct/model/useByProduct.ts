import { useIntl } from "react-intl"
import { itineraryAPI } from "@/entities/Itinerary/api"
import { useItineraryStore } from "@/entities/Itinerary/model"
import { useItineraryFiltersStore } from "@/entities/Itinerary/model/useItineraryFiltersStore"
import { planPositionAPI, usePlanPositionStore } from "@/entities/PlanPosition"
import { IPlanPosition } from "@/entities/PlanPosition/lib"
import { IProduct, useProductStore } from "@/entities/Product"
import { getCachedData, showToast } from "@/shared"
import { APIError, mapAPIError } from "@/shared/api/apiError"
import { useSWRConfig } from "swr"

export const useByProduct = () => {
	const intl = useIntl()
	const { cache } = useSWRConfig()
	const products = useProductStore((state) => state.products)
	const setPlanPositions = usePlanPositionStore(
		(state) => state.setPlanPositions,
	)
	const setProductId = useItineraryFiltersStore((state) => state.setProductId)
	const setItineraries = useItineraryStore((state) => state.setItineraries)
	// TODO: в lib
	const getCachedPlanPositions = async (
		productId: number,
	): Promise<IPlanPosition[]> => {
		const cacheKey = [
			["planPositions", "productId"],
			["all", productId],
		].toString()

		const serverPlanPositions = await getCachedData(cache, cacheKey, () =>
			planPositionAPI.getPlanPositionsByProduct(productId),
		)
		console.log(serverPlanPositions, "serverPla")
		if (!serverPlanPositions) {
			throw mapAPIError(404)
		}

		return serverPlanPositions
	}

	const handleSelect = async (productId: IProduct["id"]) => {
		setProductId(productId)

		const planPositions = await getCachedPlanPositions(productId)

		if (planPositions) {
			setPlanPositions(planPositions)
		}

		try {
			const itineraries = await getCachedData(
				cache,
				[
					["itineraries", "planPositions"],
					["all", [planPositions.map((planPos) => planPos.id)]],
				].toString(),
				() =>
					itineraryAPI.getItinerariesByPlanPositionIds(
						planPositions.map((planPos) => planPos.id),
					),
			)
			if (itineraries == undefined || itineraries.length == 0) {
				throw mapAPIError(404)
			}

			const product = products.find(
				(product) => product.id == productId,
			) as IProduct

			setItineraries(
				// TODO: в отдельную функцию
				itineraries.map(
					({
						productId,
						kitIncreasingKit,
						operationsIds,
						date,
						...itiner
					}) => {
						const [kit, increasingKit] = kitIncreasingKit
							.split("/")
							.map((kits) => parseInt(kits))
						const operations = operationsIds.map((operId) => ({
							id: operId,
						}))

						return {
							...itiner,
							operations,
							product,
							date: new Date(date),
							kit,
							increasingKit,
						}
					},
				),
			)
		} catch (error) {
			if (error instanceof APIError) {
				if (error.status !== 404) {
					showToast({
						type: "warning",
						title: intl.formatMessage({ id: "warning" }),
						text: intl.formatMessage({ id: "serverRequestError" }),
						duration: 2000,
					})
				}
			} else {
				console.log(
					intl.formatMessage({ id: "unknownErrorOccurred" }),
					error,
				)
				showToast({
					type: "error",
					title: intl.formatMessage({ id: "error" }),
					text: intl.formatMessage({ id: "unknownErrorOccurred" }),
					duration: 2000,
				})
			}
		}
	}

	return {
		products,
		handleSelect,
	}
}
