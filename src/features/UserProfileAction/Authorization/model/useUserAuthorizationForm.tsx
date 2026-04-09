import { userAPI, IUser } from "@/entities/User"
import { useUserStore } from "@/entities/User"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { isAPIError, useAPIErrorHandler } from "@/shared/api"
import { useState } from "react"
import { TErrorForm } from "@/shared/lib"

interface FormErrors {
	common: string
}

export const useUserAuthorizationForm = () => {
	const setCurrentUser = useUserStore((state) => state.setCurrentUser)
	const [formErrors, setFormErrors] = useState<TErrorForm<FormErrors> | null>(
		null,
	)

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
		setFormErrors(null)
		try {
			const user = await userAPI.login({
				login: data.login,
				password: data.password,
			})
			setCurrentUser(user)
			isAuthenticated = true
		} catch (error) {
			if (isAPIError(error) && error.status === 404) {
				setFormErrors({
					common: "Пользователь с таким логином и паролем не найден",
				})
			} else {
				apiErrorCatcher(error as Error)
			}
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
		formErrors,
		setFormErrors,
	}
}
