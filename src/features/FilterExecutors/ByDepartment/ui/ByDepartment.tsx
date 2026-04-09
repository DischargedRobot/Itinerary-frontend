"use client"

import { SearchDropDownMenu } from "@/shared"
import { useByDepartment } from "../model"

interface ByDepartmentProps<T> {
	options: Array<{ id: T; name: string }>
	value: T | null
	onChange: (value: T) => void
	placeholder?: string
}

export const ByDepartment = <T,>({
	options,
	value,
	onChange,
	placeholder,
}: ByDepartmentProps<T>) => {
	return (
		<SearchDropDownMenu
			value={value}
			onSelect={(val) => {
				if (val) {
					onChange(val)
				}
			}}
			options={options.map((dep) => ({
				value: dep.id,
				label: dep.name,
			}))}
			placeholder={placeholder}
		/>
	)
}
