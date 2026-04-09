import { useState } from "react"
import { userAPI } from "@/entities/User/api/userAPI"
import { useAPIErrorHandler } from "@/shared/api"

export const useLogOut = () => {
	const apiErrorCatcher = useAPIErrorHandler()
	const [isLoading, setIsLoading] = useState(false)

	const logout = async () => {
		setIsLoading(true)
		try {
			window.location.pathname = "/auth"
			await userAPI.logout()
		} catch (error) {
			apiErrorCatcher(error as Error)
		}
	}

	return { logout, isLoading }
}
