import { useCallback, useEffect, useRef, useState } from "react"
import { useToastStore } from "./useToastStore"

export const useToast = (id: number) => {
	const [isFade, setIsFade] = useState<boolean>(false)
	const timer = useRef<number>(null)
	const toast = useRef<HTMLDivElement>(null)

	const removeToast = useToastStore((state) => state.removeToast)
	const setActiveToast = useToastStore((state) => state.setActiveToast)
	const toasts = useToastStore((state) => state.toasts)
	const activeToast = useToastStore((state) => state.activeToast)

	const toastItem = toasts.find((t) => t.id === id)
	const isActive = activeToast?.id === id
	const duration = toastItem?.duration ?? 3000

	const startTimer = useCallback(() => {
		if (timer.current) {
			clearTimeout(timer.current)
		}
		timer.current = window.setTimeout(() => {
			setIsFade(true)
		}, duration)
	}, [duration])

	useEffect(() => {
		const handleMouseEnter = (e: MouseEvent) => {
			e.stopPropagation()
			if (timer.current) {
				clearTimeout(timer.current)
			}
			if (!isActive && toast.current) {
				const rect = toast.current.getBoundingClientRect()
				setActiveToast({
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
			setActiveToast(null)
			startTimer()
		}

		const handleTransitionEnd = () => {
			if (!isActive) {
				removeToast(id)
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
	}, [id, removeToast, startTimer, isActive, setActiveToast])

	useEffect(() => {
		if (!isActive) {
			startTimer()
		} else {
			if (timer.current) {
				clearTimeout(timer.current)
			}
		}
	}, [isActive, startTimer])

	return {
		toast,
		isFade,
		isActive,
		toastItem,
	}
}
