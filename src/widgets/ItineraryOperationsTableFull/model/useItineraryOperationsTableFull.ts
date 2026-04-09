import { IOperation } from "@/entities/Operations/lib"
import { operationAPI, toOperationResponse } from "@/entities/Operations/api"
import { useAPIErrorHandler } from "@/shared/api"

export const useItineraryOperationsTableFull = () => {
	const apiErrorCatcher = useAPIErrorHandler()
	const handleEquipmentChange = async (
		operation: IOperation,
		equipmentId: number,
	) => {
		try {
			await operationAPI.putOperation({
				...toOperationResponse(operation),
				equipmentId,
			})
		} catch (error) {
			apiErrorCatcher(error as Error)
		}
	}

	const handleExecutorChange = async (
		operation: IOperation,
		executorId: number,
	) => {
		try {
			await operationAPI.putOperation({
				...toOperationResponse(operation),
				executorId,
			})
		} catch (error) {
			apiErrorCatcher(error as Error)
		}
	}

	return { handleEquipmentChange, handleExecutorChange }
}
