"use client"

import "./ItineraryOperationTable.scss"

import { Table } from "antd"
import { IOperation } from "../../lib"
import { IExecutor } from "@/entities/Executors/lib/ExecutorTypes"
import { IEquipment } from "@/shared/lib"
import { useCreateColumnsForItineraryTable } from "../../model/useCreateColumnsForItineraryTable"

interface Props {
	operations: IOperation[]
	renderEquipment?: (equipment: IEquipment) => React.ReactNode
	renderExecutor?: (executor?: IExecutor) => React.ReactNode
}

// TODO: это виджет, так-то
export const ItineraryOperationsTable = ({ operations, renderEquipment, renderExecutor }: Props) => {
	const columns = useCreateColumnsForItineraryTable(renderEquipment, renderExecutor)

	return (
		<Table
			columns={columns}
			dataSource={operations}
			size="small"
			rowClassName=" text text_tiny text_2very-litle max-h-5.5 overflow-hidden"
			className="itinerary-operation-table max-w-225! "
			pagination={false}
			rowKey={"id"}
			scroll={{ y: 100, x: "min-content" }}
		/>
	)
}
