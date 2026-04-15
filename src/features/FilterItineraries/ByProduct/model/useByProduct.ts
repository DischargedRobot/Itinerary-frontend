import { useIntl } from "react-intl"
import { itineraryAPI } from "@/entities/Itinerary/api"
import { useItineraryStore } from "@/entities/Itinerary/model"
import { useItineraryFiltersStore } from "@/entities/Itinerary/model/useItineraryFiltersStore"
import { operationAPI } from "@/entities/Operations"
import { planPositionAPI, usePlanPositionStore } from "@/entities/PlanPosition"
import { IPlanPosition } from "@/entities/PlanPosition/lib"
import { IProduct, useProductStore } from "@/entities/Product"
import { executorsAPI, useExecutorsStore } from "@/entities/Executors"
import { getCachedData, showToast } from "@/shared"
import { APIError, mapAPIError } from "@/shared/api/apiError"
import { useDepartmentStore } from "@/shared/model"
import { useSWRConfig } from "swr"

export const useByProduct = (setLoading?: (v: boolean) => void) => {
	const intl = useIntl()
	const { cache } = useSWRConfig()
	const products = useProductStore((state) => state.products)
	const setPlanPositions = usePlanPositionStore(
		(state) => state.setPlanPositions,
	)
	const departments = useDepartmentStore((state) => state.departments)
	const setExecutors = useExecutorsStore((state) => state.setExecutors)
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
		setLoading?.(true)
		setProductId(productId)

		try {
			const planPositions = await getCachedPlanPositions(productId)

			if (planPositions) {
				setPlanPositions(planPositions)
			}

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
				setExecutors([])
				throw mapAPIError(404)
			}

			const product = products.find(
				(product) => product.id == productId,
			) as IProduct

			setItineraries(
				// TODO: в отдельную функцию
				itineraries.map(
					({ kitIncreasingKit, operationsIds, date, ...itiner }) => {
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

			const operationsByItineraries = await Promise.all(
				itineraries.map((itinerary) =>
					getCachedData(
						cache,
						[
							["operations", "itineraryId"],
							["all", itinerary.id],
						].toString(),
						() =>
							operationAPI.getOperationsByItineraryId(
								itinerary.id,
							),
					),
				),
			)

			const departmentIds = Array.from(
				new Set(
					operationsByItineraries
						.flatMap((operations) => operations ?? [])
						.map((operation) => operation.departmentId),
				),
			)

			const executorsByDepartments = await Promise.all(
				departmentIds.map((departmentId) =>
					getCachedData(
						cache,
						[
							["executors", "departmentId"],
							["all", departmentId],
						].toString(),
						() =>
							executorsAPI.getExecutorsByDepartmentId(
								departmentId,
							),
					),
				),
			)
			console.log("executorsResp", executorsByDepartments)
			const executors = executorsByDepartments.flatMap(
				(executorsResponse, index) => {
					const departmentId = departmentIds[index]
					const department = departments.find(
						(dep) => dep.id === departmentId,
					)

					if (!department) {
						return []
					}
					return (executorsResponse ?? []).map((executor) => ({
						...executor,
						department,
						operations: executor.operations ?? [],
					}))
				},
			)

			setExecutors(executors)
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
		} finally {
			setLoading?.(false)
		}
	}

	return {
		products,
		handleSelect,
	}
}
