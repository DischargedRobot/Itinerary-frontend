import { IOperation } from "@/entities/Operations/lib"
import { ItineraryOperationsTable } from "@/entities/Operations/ui/ItineraryOperationsTable/ItineraryOperationsTable"
import { SelectEquipment } from "@/features/SelectEquipment"
import { SelectExecutorInTable } from "@/features/SelectExecutorInTable/ui/SelectExecutorInTable"
import { operationAPI, toOperationResponse } from "@/entities/Operations/api"
import { apiErrorCatcher } from "@/shared"

interface Props {
	operations: IOperation[]
}

export const ItineraryOperationsTableFull = ({ operations }: Props) => {
	const handleEquipmentChange = async (operation: IOperation, equipmentId: number) => {
		try {
			await operationAPI.putOperation({
				...toOperationResponse(operation),
				equipmentId,
			})
		} catch (error) {
			apiErrorCatcher(error as Error)
		}
	}

	const handleExecutorChange = async (operation: IOperation, executorId: number) => {
		try {
			await operationAPI.putOperation({
				...toOperationResponse(operation),
				executorId,
			})
		} catch (error) {
			apiErrorCatcher(error as Error)
		}
	}

	return (
		<ItineraryOperationsTable
			operations={operations}
			renderEquipment={(operation) => (
				<SelectEquipment
					defaultValue={operation.equipment}
					onChange={(equipment) => handleEquipmentChange(operation, equipment.id)}
				/>
			)}
			renderExecutor={(operation) => (
				<SelectExecutorInTable
					defaultValue={operation.executor}
					onChange={(executor) => handleExecutorChange(operation, executor.id)}
				/>
			)}
		/>
	)
}