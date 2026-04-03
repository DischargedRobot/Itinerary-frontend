"use client"

import { Calendar, CalendarProps } from "antd"
import { useEffect, useRef, useState } from "react"
import type { Dayjs } from "dayjs"
import dayjs from "dayjs"
import "dayjs/locale/ru"
import localizedFormat from "dayjs/plugin/localizedFormat"
interface Props {
	onSelect: (date: Date) => void
	defaultDate?: Date
}
dayjs.extend(localizedFormat)
dayjs.locale("ru")

export const SelectDate = ({ onSelect, defaultDate }: Props) => {
	const [isVisible, setIsVisible] = useState<boolean>(false)

	const calendarRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				calendarRef.current &&
				!calendarRef.current.contains(e.target as Node)
			) {
				setIsVisible(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)

		return () =>
			document.removeEventListener("mousedown", handleClickOutside)
	}, [])

	const [selectedDate, setSelectedDate] = useState<Dayjs>(
		defaultDate ? dayjs(defaultDate) : dayjs(),
	)

	// Обработчик изменения даты
	const onDateChange: CalendarProps<Dayjs>["onChange"] = (date) => {
		console.log("Выбрана дата:", date.format("YYYY-MM-DD"))
		setSelectedDate(date)
	}

	return (
		<div ref={calendarRef} className="relative">
			{isVisible ? (
				<Calendar
					value={selectedDate}
					classNames={{
						item: "hover:text-active-text!",
					}}
					className="absolute z-10 top-[150%] w-75"
					fullscreen={false}
					onSelect={(date, mode) => {
						const Date = date.toDate()
						onSelect(Date)
						if (mode.source === "date") {
							setIsVisible(false)
						}
					}}
					onChange={onDateChange}
					onPanelChange={(_, mode) => console.log(mode, "mode")}
				/>
			) : (
				""
			)}
			<span
				className=" p-2 bg-foreground border borde-stroke rounded-md"
				onClick={() => {
					setIsVisible((prev) => !prev)
				}}
			>
				{selectedDate.format("L")}
			</span>
		</div>
	)
}
