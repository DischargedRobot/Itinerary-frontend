import { useState } from "react"

export const useProductTable = () => {
	const [isVisible, setIsVisible] = useState<boolean>()

	return { isVisible, setIsVisible }
}
