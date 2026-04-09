"use client"

import { useIntl } from "react-intl"
import { useExecutorFiltersStore } from "@/entities/Executors"

export const ByBrigade = () => {
	const setIsBrigade = useExecutorFiltersStore((state) => state.setIsBrigade)
	const intl = useIntl()

	return (
		<label className="title flex items-center gap-2">
			<span>{intl.formatMessage({ id: "brigade" })}</span>
			<input
				type="checkbox"
				onChange={(e) => setIsBrigade(e.target.checked)}
			/>
		</label>
	)
}
