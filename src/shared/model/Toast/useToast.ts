import {  useEffect, useRef, useState } from "react"
import { TToast, useToastStore } from "./useToastStore"

export const useToast = () => {

    const duration = useToastStore(state => state.duration)
    const title = useToastStore(state => state.title)
    const message = useToastStore(state => state.message)
    const type = useToastStore(state => state.type)
    const key = useToastStore(state => state.key)

    const [isFade, setIsFade] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const timer = useRef<number>(null)

    const startTimer = () => {
        if (timer.current) {
            clearTimeout(timer.current)
        }

        timer.current = window.setTimeout(() => {
            setIsFade(true)
        }, duration)
    }

    const toast = useRef<HTMLElement>(null)

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
            if (isFade) {
                setIsVisible(false)
            }
        }

        const toastElement = toast.current
        toastElement?.addEventListener('mouseover', handleMouseOver)
        toastElement?.addEventListener('mouseout', handleMouseOut)
        toastElement?.addEventListener('transitionend', handleTransitionEnd)

        return () => {
            toastElement?.removeEventListener('mouseout', handleMouseOut)
            toastElement?.removeEventListener('mouseover',handleMouseOver)
            toastElement?.removeEventListener('transitionend',handleTransitionEnd)

            if (timer.current) {
                clearTimeout(timer.current)
            }
        }

    }, [])

    useEffect(() => {
        startTimer()
    }, [key])

    return  {
        title,
        message,
        type,
        isVisible,
        isFade,
    }
}
