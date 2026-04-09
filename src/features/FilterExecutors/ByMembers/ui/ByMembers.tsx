"use client"

import { useIntl } from "react-intl"
import { useExecutorFiltersStore } from "@/entities/Executors"

export const ByMembers = () => {
	const setMembers = useExecutorFiltersStore((state) => state.setMembers)
	const intl = useIntl()

	return (
		<label className="p-2 w-37.5 bg-foreground border border-stroke rounded-md title hover:border-hover has-focus:border-active focus:border-active active:border-active">
			<input
				name="executor"
				type="search"
				placeholder={intl.formatMessage({ id: "members" })}
				onChange={(e) =>
					setMembers(
						e.target.value
							.split(" ")
							.filter((member) => member !== ""),
					)
				}
			/>
		</label>
	)
}
