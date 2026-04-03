import { ColumnsType } from "antd/es/table"
import { IOperation } from "../lib"
import { IExecutor } from "@/entities/Executors/lib/ExecutorTypes"
import { ICatergory, IEquipment } from "@/shared/lib"
import { ITypeOperation } from "@/entities/OperationType"

export const useCreateColumnsForItineraryTable = (
	renderEquipment?: (equipment: IEquipment) => React.ReactNode,
	renderExecutor?: (executor?: IExecutor) => React.ReactNode,
) => {
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
			render: (equipment: IEquipment) => {
				return renderEquipment?.(equipment) ?? equipment.name
			},
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
			render: (executor?: IExecutor) => renderExecutor?.(executor) ?? (executor?.name || ""),
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

	return columns
}