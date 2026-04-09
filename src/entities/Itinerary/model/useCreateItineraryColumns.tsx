import type { ColumnsType } from "antd/es/table"
import { Tag } from "antd"
import { IProduct } from "@/entities/Product"
import { IItineraryWithFullOpearions } from "../lib"
import { FormattedMessageWithValues } from "@/shared/lang/FormattedMessageWithValues"

export const useCreateItineraryColumns = () => {
	const columns: ColumnsType<IItineraryWithFullOpearions> = [
		{
			title: <FormattedMessageWithValues id="date" />,
			dataIndex: "date",
			key: "date",
			width: 120,
			align: "center",
			showSorterTooltip: false,
			sorter: (a, b) =>
				new Date(a.date).getTime() - new Date(b.date).getTime(),
			render: (date: Date) => date.toLocaleDateString(),
		},
		{
			title: <FormattedMessageWithValues id="productCode" />,
			dataIndex: "product",
			key: "productCode",
			width: 180,
			render: (product: IProduct) => {
				return (
					<span className="p-1 rounded-md border border-stroke bg-gray-100">
						{product?.audCode || "—"}
					</span>
				)
			},
		},
		{
			title: <FormattedMessageWithValues id="productName" />,
			dataIndex: "product",
			key: "productName",
			width: 200,
			ellipsis: true,
			render: (product: IProduct) => {
				return <span>{product?.name || ""}</span>
			},
		},
		{
			title: <FormattedMessageWithValues id="number" />,
			dataIndex: "numberPositions",
			key: "numberPositions",
			width: 100,
			align: "right",
			showSorterTooltip: false,
			sorter: (a, b) => a.numberPositions - b.numberPositions,
			render: (value: number) => value,
		},
		{
			title: <FormattedMessageWithValues id="kit" />,
			key: "kit",
			width: 100,
			align: "right",
			render: (_, record) => (
				<span>
					{record.kit}/{record.increasingKit}
				</span>
			),
		},
		{
			title: <FormattedMessageWithValues id="route" />,
			dataIndex: "route",
			key: "route",
			width: 150,
			ellipsis: true,
			render: (route: number[]) => {
				if (!route?.length) return "—"

				// Показываем маршрут как строку с дефисами
				const routeString = route.join("-")

				// Если маршрут длинный, обрезаем с многоточием
				if (routeString.length > 20) {
					return (
						<Tag color="geekblue" style={{ maxWidth: 180 }}>
							{routeString.substring(0, 20)}...
						</Tag>
					)
				}

				return <Tag color="geekblue">{routeString}</Tag>
			},
		},
	]

	return columns
}
