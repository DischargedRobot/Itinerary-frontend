"use client"

import { useRef, useEffect, useState } from "react"
import { useParams, useRouter, usePathname } from "next/navigation"
import "./LanguageSwitcher.scss"

type Locale = "en-US" | "ru-RU"

export const LanguageSwitcher = () => {
	const params = useParams()
	const router = useRouter()
	const pathname = usePathname()
	const buttonRef = useRef<HTMLButtonElement>(null)
	const [nextPath, setNextPath] = useState<string | null>(null)
	const langParam = params.lang
	const [currentLang, setCurrentLang] =
		useState(langParam as string) || "ru-RU"

	useEffect(() => {
		if (!nextPath || !buttonRef.current) return
		const handleTransitionEnd = () => {
			router.push(nextPath)
			setNextPath(null)
		}

		buttonRef.current.addEventListener(
			"transitionend",
			handleTransitionEnd as EventListener,
		)

		return () => {
			buttonRef.current?.removeEventListener(
				"transitionend",
				handleTransitionEnd as EventListener,
			)
		}
	}, [nextPath, router])

	const handleToggle = () => {
		const newLang: Locale = currentLang === "ru-RU" ? "en-US" : "ru-RU"
		setCurrentLang(newLang)
		console.log(newLang, "newLang", currentLang)
		const newPathname = pathname.replace(`/${currentLang}`, `/${newLang}`)
		setNextPath(newPathname)
	}

	const isRussian = currentLang === "ru-RU"
	console.log(isRussian, "isRussia")
	return (
		<div className="language-switcher" onClick={(e) => e.stopPropagation()}>
			<span className={`language-label ${isRussian ? "active" : ""}`}>
				РУ
			</span>
			<button
				ref={buttonRef}
				className={`switch-toggle ${isRussian ? "ru" : "en"}`}
				onClick={handleToggle}
				type="button"
			/>
			<span className={`language-label ${!isRussian ? "active" : ""}`}>
				EN
			</span>
		</div>
	)
}
