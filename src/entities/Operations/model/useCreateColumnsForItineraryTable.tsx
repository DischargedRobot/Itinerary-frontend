import { ColumnsType } from "antd/es/table"
import { IOperation } from "../lib"
import { IExecutor } from "@/entities/Executors/lib/ExecutorTypes"
import { ICatergory, IEquipment } from "@/shared/lib"
import { ITypeOperation } from "@/entities/OperationType"
import { FormattedMessageWithValues } from "@/shared/lang/FormattedMessageWithValues"

export const useCreateColumnsForItineraryTable = (
	renderEquipment?: (operation: IOperation) => React.ReactNode,
	renderExecutor?: (operation: IOperation) => React.ReactNode,
) => {
	const columns: ColumnsType<IOperation> = [
		{
			title: <FormattedMessageWithValues id="id" />,
			dataIndex: "id",
			key: "id",
			width: "45px",
			ellipsis: true,
			align: "center",
		},
		{
			title: <FormattedMessageWithValues id="department" />,
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
			title: <FormattedMessageWithValues id="operationType" />,
			dataIndex: "type",
			key: "type",
			width: "100px",
			ellipsis: true,
			render: (type: ITypeOperation) => type.name,
		},
		{
			title: <FormattedMessageWithValues id="category" />,
			dataIndex: "category",
			ellipsis: true,
			width: 75,
			key: "category",
			render: (category: ICatergory) => category.name,
		},
		{
			title: <FormattedMessageWithValues id="normTime" />,
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
			title: <FormattedMessageWithValues id="number" />,
			dataIndex: "numberPositions",
			key: "numberPositions",
			width: "50px",
			ellipsis: true,
			minWidth: 50,
			align: "right",
		},
		{
			title: <FormattedMessageWithValues id="equipment" />,
			dataIndex: "equipment",
			key: "equipment",
			width: "100px",
			ellipsis: true,
			render: renderEquipment
				? (_, record) => renderEquipment(record)
				: (equipment: IEquipment) => equipment.name,
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
			title: <FormattedMessageWithValues id="executor" />,
			dataIndex: "executor",
			key: "executor",
			align: "left",
			width: 110,
			ellipsis: true,
			render: renderExecutor
				? (_, record) => renderExecutor(record)
				: (executor?: IExecutor) => executor?.name || "",
		},
		{
			title: <FormattedMessageWithValues id="paymentCoefficient" />,
			dataIndex: "paymentCoefficient",
			key: "paymentCoefficient",
			width: "40px",
			align: "right",
			render: (value?: number) => value?.toFixed(2) || "",
		},
		{
			title: <FormattedMessageWithValues id="award" />,
			dataIndex: "award",
			key: "award",
			width: "70px",
			ellipsis: true,
			align: "right",
			render: (value?: number) =>
				value !== undefined ? `${value.toFixed(0)}%` : " ",
		},
		{
			title: <FormattedMessageWithValues id="dateIssue" />,
			dataIndex: "dateIssue",
			ellipsis: true,
			key: "dateIssue",
			width: "100px",
			render: (date?: Date) => (date ? date.toLocaleDateString() : ""),
		},
		{
			title: <FormattedMessageWithValues id="dateExecution" />,
			dataIndex: "dateExecution",
			key: "dateExecution",
			ellipsis: true,
			width: "100px",
			render: (date?: Date) => (date ? date.toLocaleDateString() : ""),
		},
	]

	return columns
}
