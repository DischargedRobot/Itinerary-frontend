import { IOperation } from "@/entities/Operations/lib"
import { ItineraryOperationsTable } from "@/entities/Operations/ui/ItineraryOperationsTable/ItineraryOperationsTable"
import { SelectEquipment } from "@/features/SelectEquipmentInTable"
import { SelectExecutorInTable } from "@/features/SelectExecutorInTable/ui/SelectExecutorInTable"
import { useItineraryOperationsTableFull } from "../model"
import { useAbility } from "@/shared/model"

interface Props {
	operations: IOperation[]
}

export const ItineraryOperationsTableFull = ({ operations }: Props) => {
	const { handleEquipmentChange, handleExecutorChange } =
		useItineraryOperationsTableFull()
	const ability = useAbility()

	return (
		<ItineraryOperationsTable
			operations={operations}
			renderEquipment={(operation) => (
				<SelectEquipment
					operationTypeId={operation.type.id}
					defaultValue={operation.equipment}
					disabled={ability.cannot("update", "Operation")}
					onChange={(equipment) =>
						handleEquipmentChange(operation, equipment.id)
					}
				/>
			)}
			renderExecutor={(operation) => (
				<SelectExecutorInTable
					filters={{ departmentId: operation.department.id }}
					defaultValue={operation.executor}
					disabled={ability.cannot("update", "Executor")}
					onChange={(executor) =>
						handleExecutorChange(operation, executor.id)
					}
				/>
			)}
		/>
	)
}
