import { useState } from "react"
import { userAPI } from "@/entities/User/api/userAPI"
import { apiErrorCatcher } from "@/shared"

export const useLogOut = () => {
	const [isLoading, setIsLoading] = useState(false)

	const logout = async () => {
		setIsLoading(true)
		try {
			window.location.href = "/auth"
			await userAPI.logout()
		} catch (error) {
			apiErrorCatcher(error as Error)
		}
	}

	return { logout, isLoading }
}
