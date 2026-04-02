// "use client"

import { PersonalInput } from "@/shared"
import { IUser } from "../lib"
import { UseFormRegister, FieldErrors } from "react-hook-form"

interface Props {
    register: UseFormRegister<IUser>
    errors: FieldErrors<IUser>
}

export const UserPersonalData = ({ register, errors }: Props) => {
    return (
        <>
            <PersonalInput
                type="login"
                name="login"
                placeholder="Логин"
                rules={{
                    required: {
                        value: true,
                        message: "Это поле обязательно для заполнения",
                    },
                }}
                register={register}
                error={errors?.login}
            />
            <PersonalInput
                type="password"
                name="password"
                placeholder="Пароль"
                rules={{
                    required: {
                        value: true,
                        message: "Это поле обязательно для заполнения",
                    },
                    minLength: {
                        value: 6,
                        message:
                            "Пароль должен состоять минимум из 6 символов",
                    },
                }}
                register={register}
                error={errors?.password}
            />
            <PersonalInput
                type="email"
                name="email"
                placeholder="Почта"
                register={register}
                error={errors?.email}
            />
            <PersonalInput
                type="tel"
                name="phoneNumber"
                placeholder="Телефон"
                register={register}
                error={errors?.phoneNumber}
            />
        </>
    )
}
