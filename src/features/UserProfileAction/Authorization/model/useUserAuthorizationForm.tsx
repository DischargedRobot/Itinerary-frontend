import { IUser, userAPI } from "@/entities/User"
import { apiErrorCatcher } from "@/shared"
import { useUserStore } from "@/entities/User"
import { useForm } from "react-hook-form"

export const useUserAuthorizationForm = () => {
    const setCurrentUser = useUserStore((state) => state.setCurrentUser)

    const {
        handleSubmit,
        register,
        formState: { errors, isDirty },
        reset,
    } = useForm<IUser>()

    const handleLogin = async (data: IUser) => {
        try {
            const user = await userAPI.login({ login: data.login, password: data.password })
            setCurrentUser(user)
        } catch (error) {
            apiErrorCatcher(error as Error)
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
