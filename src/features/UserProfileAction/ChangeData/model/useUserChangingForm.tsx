import { IUser, userAPI } from "@/entities/User"
import { useForm } from "react-hook-form"

export const useUserChangingForm = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isDirty },
        reset,
    } = useForm<IUser>()

    const handleSaveChanges = (user: IUser) => {
        userAPI.updateProfile(user)
    }

    return {
        handleSubmit,
        register,
        errors,
        isDirty,
        reset,
        handleSaveChanges,
    }
}
