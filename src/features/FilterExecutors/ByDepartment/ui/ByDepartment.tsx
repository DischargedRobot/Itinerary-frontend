"use client"

import { SearchDropDownMenu } from "./SearchDropDownMenu"
import { useByDepartment } from "../model"

export const ByDepartment = () => {
	const { value, handleSelect, departments } = useByDepartment()

	return (
		<SearchDropDownMenu
			value={value}
			onSelect={(value) => {
				if (value) {
					console.log(value, "value")

					handleSelect(value)
				}
			}}
			options={departments.map((dep) => ({
				value: dep.id,
				label: dep.name,
			}))}
		/>
	)
}
