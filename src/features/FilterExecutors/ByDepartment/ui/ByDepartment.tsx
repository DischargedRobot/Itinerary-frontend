"use client"

import { useEffect } from "react"
import { SearchDropDownMenu } from "@/shared"
import { useByDepartment } from "../model"

interface Props {
	options: Array<{ id: number; name: string }>
	defaultValue?: number | null
	onChange?: (value: number) => void
	placeholder?: string
}

export const ByDepartment = ({
	options,
	defaultValue,
	onChange,
	placeholder,
}: Props) => {
	const { value, handleSelect } = useByDepartment()

	useEffect(() => {
		if (defaultValue && !value) {
			handleSelect(defaultValue as number)
		}
	}, [defaultValue, value, handleSelect])

	return (
		<SearchDropDownMenu<number>
			value={value}
			onSelect={(val) => {
				if (val) {
					handleSelect(val as number)
					onChange?.(val)
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
