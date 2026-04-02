import {
	enrichOperation,
	isIOperation,
	operationAPI,
} from "@/entities/Operations"
import { IItinerary } from "../lib"
import { getCachedData } from "@/shared"
import { useSWRConfig } from "swr"
import { useItineraryStore } from "./useItineraryStore"
import { useCategoriesStore } from "@/entities/Category"
import { useEquipmentStore } from "@/entities/Equipment"
import { useOperationTypeStore } from "@/entities/OperationType/model"
import { useDepartmentStore } from "@/shared/model"
import { APIError, apiErrorCatcher } from "@/shared/api"

export const useItineraryTable = () => {
	const { cache } = useSWRConfig()
	const departments = useDepartmentStore((state) => state.departments)
	const categories = useCategoriesStore((state) => state.categories)
	const operationTypes = useOperationTypeStore(
		(state) => state.operationTypes,
	)
	const equipments = useEquipmentStore((state) => state.equipments)

	const addOperationsToItinerary = useItineraryStore(
		(state) => state.addOperationsToIitnerary,
	)

	const handleExpand = async (itinerary: IItinerary) => {
		try {
			const operationsResponce = await getCachedData(
				cache,
				[
					["operations", "itineraryId"],
					["all", itinerary.id],
				].toString(),
				() => operationAPI.getOperationsByItineraryId(itinerary.id),
			)

			if (operationsResponce !== undefined) {
				const operations = operationsResponce
					.map((operResp) =>
						enrichOperation(
							operResp,
							departments,
							equipments,
							categories,
							operationTypes,
						),
					)
					.filter(isIOperation)

				addOperationsToItinerary(operations, itinerary.id)
			}
		} catch (error) {
			apiErrorCatcher(error as Error | APIError)
		}
	}

	const handleUnSelect = (itinerary: IItinerary) => {
		const operations = getCachedData(
			cache,
			[
				["operations", "itineraryId"],
				["all", itinerary.id],
			].toString(),
			() => operationAPI.getOperationsByItineraryId(itinerary.id),
		)
	}

	return { handleExpand, handleUnSelect }
}
