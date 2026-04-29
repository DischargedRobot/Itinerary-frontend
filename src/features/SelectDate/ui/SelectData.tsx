"use client"

import { useIntl } from "react-intl"
import { Calendar, CalendarProps } from "antd"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
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
	console.log(defaultDate, "SelectDate1")
	const intl = useIntl()
	const [isVisible, setIsVisible] = useState<boolean>(false)

	const calendarRef = useRef<HTMLDivElement | null>(null)
	const triggerRef = useRef<HTMLSpanElement | null>(null)

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as Node
			if (
				calendarRef.current &&
				!calendarRef.current.contains(target) &&
				triggerRef.current &&
				!triggerRef.current.contains(target)
			) {
				setIsVisible(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)

		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [])

	const [selectedDate, setSelectedDate] = useState<Dayjs | undefined>(
		defaultDate ? dayjs(defaultDate) : undefined,
	)

	// Обработчик изменения даты
	const onDateChange: CalendarProps<Dayjs>["onChange"] = (date) => {
		console.log(
			intl.formatMessage({ id: "selectDate" }),
			date.format("YYYY-MM-DD"),
		)
		setSelectedDate(date)
	}

	const [portalPos, setPortalPos] = useState<{ left: number; top: number } | null>(null)

	useEffect(() => {
		if (isVisible && triggerRef.current) {
			const rect = triggerRef.current.getBoundingClientRect()
			setPortalPos({ left: rect.left, top: rect.bottom + window.scrollY })
		}
	}, [isVisible])

	console.log(selectedDate, "SelectDate")
	return (
		<div className="relative inline-block">
			<span
				ref={triggerRef}
				className=" p-2 bg-foreground border borde-stroke rounded-md hover:text-hover hover:border-active"
				onClick={() => setIsVisible((prev) => !prev)}
			>
				{selectedDate ? selectedDate.format("L") : ""}
			</span>

			{isVisible && portalPos
				? createPortal(
					<div
						ref={calendarRef}
						style={{ position: "absolute", left: portalPos.left, top: portalPos.top }}
					>
						<Calendar
							className="max-w-75"
							value={selectedDate}
							classNames={{ item: "hover:text-active-text!" }}
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
					</div>,
					document.body,
				)
				: null}
		</div>
	)
}
