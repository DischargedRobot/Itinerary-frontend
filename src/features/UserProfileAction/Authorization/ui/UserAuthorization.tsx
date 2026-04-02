"use client"

import { Button } from "antd"
import { UserAuthData } from "@/entities/User"
import { useUserAuthorizationForm } from "../model"

export const UserAuthorization = () => {
    const { handleSubmit, register, errors, isDirty, reset, handleLogin } = useUserAuthorizationForm()

    return (
        <form
            className="flex flex-col gap-12 w-full max-w-120"
            onSubmit={handleSubmit((data) => {
                handleLogin(data)
            })}
        >
            <div className="flex flex-col gap-9">
                <UserAuthData register={register} errors={errors} />
            </div>

            <div className="flex justify-between">
                <Button className="max-w-50 w-full" htmlType="submit" disabled={!isDirty}>
                    Войти
                </Button>
                <Button
                    className="max-w-50 w-full"
                    onClick={() =>
                        reset({
                            login: "",
                            password: "",
                        })
                    }
                    disabled={!isDirty}
                >
                    Очистить
                </Button>
            </div>
        </form>
    )
}
