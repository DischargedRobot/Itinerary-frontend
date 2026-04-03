import { IUser, userAPI } from "@/entities/User"
import { apiErrorCatcher } from "@/shared"
import { useUserStore } from "@/entities/User"
import { useForm } from "react-hook-form"
import { isAPIError } from "@/shared/api"
import { redirect } from "next/navigation"

export const useUserAuthorizationForm = () => {
    const setCurrentUser = useUserStore((state) => state.setCurrentUser)

    const {
        handleSubmit,
        register,
        formState: { errors, isDirty },
        reset,
    } = useForm<IUser>()

    const handleLogin = async (data: IUser) => {
        let isAuthenticated = false
        try {
            const user = await userAPI.login({ login: data.login, password: data.password })
            setCurrentUser(user)
            isAuthenticated = true
        } catch (error) {
            apiErrorCatcher(error as Error)
        }
        if (isAuthenticated) {
            redirect('/personal/profile')
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
