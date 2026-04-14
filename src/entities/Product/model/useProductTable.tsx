import { useState } from "react"

export const useProductTable = () => {
	const [isVisible, setIsVisible] = useState<boolean>(true)

	return { isVisible, setIsVisible }
}
