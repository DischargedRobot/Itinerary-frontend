"use client"

import "./ItineraryTable.scss"

import { ItineraryOperationsTable } from "@/entities/Operations"
import { useItineraryTable } from "../model"
import { Table } from "antd"
import { useFilteredItineraries } from "../model/useFiltereditineraries"
import { useCreateItineraryColumns } from "../model/useCreateItineraryColumns"
import { IOperation } from "@/entities/Operations/lib"

interface Props {
	renderOperationsTable?: (operations: IOperation[]) => React.ReactNode
	isLoading?: boolean
}

export const ItineraryTable = ({ renderOperationsTable, isLoading }: Props) => {
	const itineraries = useFilteredItineraries()
	const { handleExpand } = useItineraryTable()
	const columns = useCreateItineraryColumns()

	return (
		// <ItineraryOperationsTable operations={itineraries[0].operations}/>
		<Table
			loading={isLoading}
			columns={columns}
			size="small"
			className="itinerary-table"
			rowKey={"id"}
			dataSource={itineraries}
			pagination={{ placement: ["bottomCenter"], pageSize: 20 }}
			expandable={{
				onExpand: (expanded, itinerary) => {
					if (expanded) {
						handleExpand(itinerary)
					}
				},
				expandedRowRender: (itinerary) =>
					renderOperationsTable?.(itinerary.operations) ?? (
						<ItineraryOperationsTable operations={itinerary.operations} />
					),
			}}

		// scroll={{x: true}}
		/>
	)
}
