import { useCallback, useEffect, useRef, useState } from "react"
import { useToastStore } from "./useToastStore"

export const useToast = () => {
	const duration = useToastStore((state) => state.duration)
	const title = useToastStore((state) => state.title)
	const message = useToastStore((state) => state.message)
	const type = useToastStore((state) => state.type)
	const key = useToastStore((state) => state.key)
	const isVisible = useToastStore((state) => state.isVisible)
	const setIsVisible = useToastStore((state) => state.setIsVisible)

	const [isFade, setIsFade] = useState<boolean>(false)
	const timer = useRef<number>(null)

	const startTimer = useCallback(() => {
		if (timer.current) {
			clearTimeout(timer.current)
		}
		timer.current = window.setTimeout(() => {
			// console.log("Время вышло")
			setIsFade(true)
		}, duration)
	}, [duration])

	const toast = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleMouseOut = () => {
			startTimer()
		}

		const handleMouseOver = () => {
			setIsFade(false)
			if (timer.current) {
				clearTimeout(timer.current)
			}
		}

		const handleTransitionEnd = () => {
			setIsFade(false)
			setIsVisible(false)
		}

		const toastElement = toast.current
		toastElement?.addEventListener("mouseover", handleMouseOver)
		toastElement?.addEventListener("mouseout", handleMouseOut)
		toastElement?.addEventListener("transitionend", handleTransitionEnd)

		return () => {
			toastElement?.removeEventListener("mouseout", handleMouseOut)
			toastElement?.removeEventListener("mouseover", handleMouseOver)
			toastElement?.removeEventListener(
				"transitionend",
				handleTransitionEnd,
			)

			if (timer.current) {
				clearTimeout(timer.current)
			}
		}
	}, [key])

	useEffect(() => {
		if (isVisible) {
			startTimer()
		}
	}, [key, startTimer, isVisible])

	return {
		toast,
		title,
		message,
		type,
		isVisible,
		isFade,
	}
}
