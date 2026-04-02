import { IUser, userAPI, useUserStore } from "@/entities/User"
import { apiErrorCatcher } from "@/shared"
import { useForm } from "react-hook-form"

export const useUserChangingForm = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isDirty },
        reset,
    } = useForm<IUser>()

    const handleSaveChanges = async (user: IUser) => {
        try {
            await userAPI.updateProfile(user)
        } catch (error) {
            apiErrorCatcher(error as Error)
        }
    }

    const currentUser = useUserStore(state => state.currentUser)

    return {
        handleSubmit,
        register,
        errors,
        isDirty,
        reset,
        handleSaveChanges,
        currentUser,
    }
}
