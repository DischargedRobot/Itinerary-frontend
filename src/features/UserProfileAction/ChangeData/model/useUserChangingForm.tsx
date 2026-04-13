import { IUser, userAPI, useUserStore } from "@/entities/User"
import { useAPIErrorHandler } from "@/shared/api"
import { useForm } from "react-hook-form"

export const useUserChangingForm = () => {
	const apiErrorCatcher = useAPIErrorHandler()
	const currentUser = useUserStore((state) => state.currentUser)

	const {
		handleSubmit,
		register,
		formState: { errors, isDirty },
		reset,
	} = useForm<IUser>({ defaultValues: currentUser })

	const handleSaveChanges = async (user: IUser) => {
		try {
			await userAPI.updateProfile(user)
		} catch (error) {
			apiErrorCatcher(error as Error)
		}
	}


	const onReset = () => {
		reset(currentUser)
	}

	return {
		handleSubmit,
		register,
		errors,
		isDirty,
		onReset,
		handleSaveChanges,
		currentUser,
	}
}
