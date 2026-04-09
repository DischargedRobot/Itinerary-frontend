import { useIntl } from "react-intl"
import { useFilterOperationByIsFormed } from "../model"

export const FilterOperationByIsFormed = () => {
	const { isChecked, handleChange } = useFilterOperationByIsFormed()
	const intl = useIntl()

	return (
		<label className="title flex items-center gap-2">
			{intl.formatMessage({ id: "formedOrders" })}
			<input
				className="w-5 h-5"
				checked={isChecked}
				onChange={handleChange}
				name="isFormed"
				type="checkbox"
			/>
		</label>
	)
}
