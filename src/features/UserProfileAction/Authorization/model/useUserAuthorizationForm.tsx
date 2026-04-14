import { useIntl } from "react-intl"
import { userAPI } from "@/entities/User"
import { useUserStore } from "@/entities/User"
import { useForm } from "react-hook-form"
import { useRouter, useParams } from "next/navigation"
import { isAPIError, useAPIErrorHandler } from "@/shared/api"
import { useState } from "react"
import { TErrorForm } from "@/shared/lib"
import { IUser } from "@/entities/User"

interface IAuthorizationForm extends Pick<IUser, "login" | "password"> {
	remember: boolean
}

interface FormErrors {
	common: string
}

export const useUserAuthorizationForm = () => {
	const intl = useIntl()
	const params = useParams()
	const lang = params.lang as string
	const setCurrentUser = useUserStore((state) => state.setCurrentUser)
	const [formErrors, setFormErrors] = useState<TErrorForm<FormErrors> | null>(
		null,
	)

	const {
		handleSubmit,
		register,
		control,
		formState: { errors, isDirty },
		reset,
	} = useForm<IAuthorizationForm>({
		defaultValues: {
			login: "",
			password: "",
		},
	})

	const apiErrorCatcher = useAPIErrorHandler()

	const router = useRouter()

	const handleLogin = async (data: IAuthorizationForm) => {
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
			console.error(error, "Login error:")
			if (isAPIError(error) && error.status === 404) {
				setFormErrors({
					common: intl.formatMessage({ id: "invalidCredentials" }),
				})
			} else {
				apiErrorCatcher(error as Error)
			}
		}
		if (isAuthenticated) {
			router.push(`/${lang}/personal/profile`)
		}
	}

	return {
		handleSubmit,
		register,
		control,
		errors,
		isDirty,
		reset,
		handleLogin,
		formErrors,
		setFormErrors,
	}
}
