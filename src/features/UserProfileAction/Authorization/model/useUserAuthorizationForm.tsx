import { IUser, userAPI } from "@/entities/User"
import { useUserStore } from "@/entities/User"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useAPIErrorHandler } from "@/shared/api"

export const useUserAuthorizationForm = () => {
	const setCurrentUser = useUserStore((state) => state.setCurrentUser)

	const {
		handleSubmit,
		register,
		formState: { errors, isDirty },
		reset,
	} = useForm<IUser>()

	const apiErrorCatcher = useAPIErrorHandler()

	const routter = useRouter()

	const handleLogin = async (data: IUser) => {
		let isAuthenticated = false
		try {
			const user = await userAPI.login({
				login: data.login,
				password: data.password,
			})
			setCurrentUser(user)
			isAuthenticated = true
		} catch (error) {
			console.log("тут")
			apiErrorCatcher(error as Error)
		}
		if (isAuthenticated) {
			routter.push("/personal/profile")
		}
	}

	return {
		handleSubmit,
		register,
		errors,
		isDirty,
		reset,
		handleLogin,
	}
}
