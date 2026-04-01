"use client"

import "./ItineraryOperationTable.scss"

import { Checkbox, Table } from "antd"
import { IOperation } from "../../lib"
import { ColumnsType } from "antd/es/table"
import { IExecutor } from "@/entities/Executors/lib/ExecutorTypes"
import { ICatergory, ITypeOperation } from "@/shared"
import { SelectEquipment } from "@/features/SelectEquipment"
import { IEquipment } from "@/shared/lib"
import { SelectExecutorInTable } from "@/features/SelectExecutorInTable/ui/SelectExecutorInTable"
const columns: ColumnsType<IOperation> = [
	{
		title: "ID",
		dataIndex: "id",
		key: "id",
		width: "45px",
		ellipsis: true,
		align: "center",
	},
	{
		title: "Цех",
		dataIndex: "department",
		key: "department",
		ellipsis: true,
		width: 55,
		render: (department) => (
			<div className="max-w-13.75 overflow-hidden whitespace-nowrap text-ellipsis">
				{department.name}
			</div>
		),
	},
	{
		title: "Тип операции",
		dataIndex: "type",
		key: "type",
		width: "100px",
		ellipsis: true,
		render: (type: ITypeOperation) => type.name,
	},
	{
		title: "Категория",
		dataIndex: "category",
		ellipsis: true,
		width: 75,
		key: "category",
		render: (category: ICatergory) => category.name,
	},
	{
		title: "НВ",
		dataIndex: "normTime",
		key: "normTime",
		ellipsis: true,
		width: "100px",
		align: "right",
		render: (value: number) => (
			<div className="max-w-20 overflow-hidden whitespace-nowrap text-ellipsis">{`${value.toFixed(3)}`}</div>
		),
	},
	{
		title: "N",
		dataIndex: "numberPositions",
		key: "numberPositions",
		width: "50px",
		ellipsis: true,
		minWidth: 50,
		align: "right",
	},
	{
		title: "Оборудование",
		dataIndex: "equipment",
		key: "equipment",
		width: "100px",
		ellipsis: true,
		render: (equipment: IEquipment) => (
			<SelectEquipment defaultValue={equipment} />
		),
	},
	// {
	//   title: 'Назначена',
	//   dataIndex: 'isAssigned',
	//   key: 'isAssigned',
	//   ellipsis: true,
	//   width: '75px',
	//   align: 'center',
	//   render: (checked: boolean) => <Checkbox defaultChecked={checked} />,
	// },
	{
		title: "Исполнитель",
		dataIndex: "executor",
		key: "executor",
		align: "left",
		width: 110,
		ellipsis: true,
		render: (executor?: IExecutor) => (
			<SelectExecutorInTable defaultValue={executor} />
		),
	},
	{
		title: "К",
		dataIndex: "paymentCoefficient",
		key: "paymentCoefficient",
		width: "40px",
		align: "right",
		render: (value?: number) => value?.toFixed(2) || "",
	},
	{
		title: "% премии",
		dataIndex: "award",
		key: "award",
		width: "70px",
		ellipsis: true,
		align: "right",
		render: (value?: number) =>
			value !== undefined ? `${value.toFixed(0)}%` : " ",
	},
	{
		title: "Дата выдачи",
		dataIndex: "dateIssue",
		ellipsis: true,
		key: "dateIssue",
		width: "100px",
		render: (date?: Date) => (date ? date.toLocaleDateString() : ""),
	},
	{
		title: "Дата исполнения",
		dataIndex: "dateExecution",
		key: "dateExecution",
		ellipsis: true,
		width: "100px",
		render: (date?: Date) => (date ? date.toLocaleDateString() : ""),
	},
]

interface Props {
	operations: IOperation[]
}

// TODO: это виджет, так-то
export const ItineraryOperationsTable = ({ operations }: Props) => {
	return (
		<Table
			columns={columns}
			dataSource={operations}
			size="small"
			rowClassName=" text text_tiny text_2very-litle max-h-5.5 overflow-hidden"
			className="itinerary-operation-table max-w-[900px]! "
			pagination={false}
			rowKey={"id"}
			scroll={{ y: 100, x: "min-content" }}
		/>
	)
}
