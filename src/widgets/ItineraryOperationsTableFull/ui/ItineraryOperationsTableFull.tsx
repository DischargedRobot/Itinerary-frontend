import { IOperation } from "@/entities/Operations/lib"
import { ItineraryOperationsTable } from "@/entities/Operations/ui/ItineraryOperationsTable/ItineraryOperationsTable"
import { SelectEquipment } from "@/features/SelectEquipment"
import { SelectExecutorInTable } from "@/features/SelectExecutorInTable/ui/SelectExecutorInTable"
import { useItineraryOperationsTableFull } from "../model"

interface Props {
	operations: IOperation[]
}

export const ItineraryOperationsTableFull = ({ operations }: Props) => {
	const { handleEquipmentChange, handleExecutorChange } = useItineraryOperationsTableFull()

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