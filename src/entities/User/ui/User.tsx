'use client'

import { PersonalInput } from "@/shared"
import { Avatar } from "antd"
import { useForm } from "react-hook-form"
import { IPersonalFormValues } from "../lib"

export const User = () => {

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm<IPersonalFormValues>()

    return (
        <form onSubmit={handleSubmit(() => {})}>
            <div className="grid grid-cols-[128px_auto]">
                <Avatar size={128}/>
                <div className="flex flex-col gap-12">
                    <PersonalInput
                        name="firstName"
                        placeholder="Имя"
                        rules={{required: {
                            value: true,
                            message: "Это поле обязательно для заполнения"
                        }}}
                        register={register}
                        error={errors?.firstName}
                    />
                    <PersonalInput
                        name="lastName"
                        placeholder="Фамилия"
                        rules={{required: {
                            value: true,
                            message: "Это поле обязательно для заполнения"
                        }}}
                        register={register}
                        error={errors?.lastName}
                    />
                    <PersonalInput
                        name="patronymic"
                        placeholder="Отчество"
                        rules={{required: {
                            value: true,
                            message: "Это поле обязательно для заполнения"
                        }}}
                        register={register}
                        error={errors?.patronymic}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-11">
                <PersonalInput
                    name="login"
                    placeholder="Логин"
                    rules={{required: {
                        value: true,
                        message: "Это поле обязательно для заполнения"
                    }}}
                    register={register}
                    error={errors?.login}
                />
                <PersonalInput
                    name='password'
                    placeholder="Парроль"
                    rules={{
                        required: {
                            value: true,
                            message: "Это поле обязательно для заполнения",
                        },
                        minLength: {
                            value: 6,
                            message: "Пароль должен состоять минимум из 6 символов"
                        }}}
                    register={register}
                    error={errors?.password}
                />
                <PersonalInput
                    name="email"
                    placeholder="Почта"
                    register={register}
                    error={errors?.email}
                />
            </div>
        </form>
    )
}