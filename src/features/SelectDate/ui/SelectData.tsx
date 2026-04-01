"use client"

import { Calendar } from "antd"
import { useEffect, useRef, useState } from "react"

interface Props {
	onSelect: (date: Date) => void
}

export const SelectDate = ({ onSelect }: Props) => {
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const [date, setDate] = useState<Date>(new Date())

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

	return (
		<div ref={calendarRef} className="relative">
			{isVisible ? (
				<Calendar
					classNames={{
						item: "hover:text-active-text!",
					}}
					className="absolute z-10 top-[150%] w-75"
					fullscreen={false}
					onSelect={(date, mode) => {
						const Date = date.toDate()
						onSelect(Date)
						setDate(Date)
						if (mode.source === "date") {
							setIsVisible(false)
						}
					}}
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
				{date.toLocaleDateString()}
			</span>
		</div>
	)
}
