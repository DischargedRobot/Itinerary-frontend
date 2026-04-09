"use client"

import "./Toast.scss"

import { useCallback, useEffect, useRef, useState } from "react"
import {
	CheckOutlined,
	ExclamationOutlined,
	WarningOutlined,
} from "@ant-design/icons"
import { useToastStore } from "@/shared/model"
import { IToastItem } from "@/shared/model/Toast/useToastStore"

type TToast = "warning" | "success" | "error"

const icons = new Map<TToast, React.ReactNode>([
	["warning", <WarningOutlined className="toast__icon" key={"warning"} />],
	["success", <CheckOutlined className="toast__icon" key={"success"} />],
	["error", <ExclamationOutlined className="toast__icon" key={"error"} />],
])

interface ToastProps extends IToastItem {
	onRemove: (id: number) => void
	isActive?: boolean
}

const Toast = ({
	type,
	text,
	title,
	duration,
	id,
	onRemove,
	isActive = false,
}: ToastProps) => {
	const [isFade, setIsFade] = useState<boolean>(false)
	const timer = useRef<number>(null)

	const startTimer = useCallback(() => {
		if (timer.current) {
			clearTimeout(timer.current)
		}
		timer.current = window.setTimeout(() => {
			setIsFade(true)
		}, duration)
	}, [duration])

	const toast = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleMouseEnter = (e: MouseEvent) => {
			e.stopPropagation()
			if (timer.current) {
				clearTimeout(timer.current)
			}
			// Сохраняем позицию только если тост ещё не активный
			if (!isActive && toast.current) {
				const rect = toast.current.getBoundingClientRect()
				useToastStore.getState().setActiveToast({
					id,
					position: {
						top: rect.top + window.scrollY,
						left: rect.left + window.scrollX,
					},
				})
			}
		}

		const handleMouseLeave = (e: MouseEvent) => {
			e.stopPropagation()
			useToastStore.getState().setActiveToast(null)
			startTimer()
		}

		const handleTransitionEnd = () => {
			// Не удаляем если тост активный
			if (!isActive) {
				onRemove(id)
			}
		}

		const toastElement = toast.current
		toastElement?.addEventListener("mouseenter", handleMouseEnter)
		toastElement?.addEventListener("mouseleave", handleMouseLeave)
		toastElement?.addEventListener("transitionend", handleTransitionEnd)

		return () => {
			toastElement?.removeEventListener("mouseenter", handleMouseEnter)
			toastElement?.removeEventListener("mouseleave", handleMouseLeave)
			toastElement?.removeEventListener(
				"transitionend",
				handleTransitionEnd,
			)

			if (timer.current) {
				clearTimeout(timer.current)
			}
		}
	}, [id, onRemove, startTimer, isActive])

	useEffect(() => {
		if (!isActive) {
			startTimer()
		} else {
			// Если тост активный, отменяем таймер
			if (timer.current) {
				clearTimeout(timer.current)
			}
		}
	}, [isActive, startTimer])

	return (
		<div
			ref={toast}
			className={`toast ${"toast_" + type} ${isFade ? "toast_fade-out" : "toast_fade-in"} ${isActive ? "toast_active" : ""}`}
		>
			{icons.get(type)}
			<h5 className="toast__title">{title}</h5>
			<span className="toas__text">{text}</span>
		</div>
	)
}

export default Toast
