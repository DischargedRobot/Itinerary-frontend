// "use client"

import { PersonalInput } from "@/shared"
import { IUser } from "../lib"
import { UseFormRegister, FieldErrors } from "react-hook-form"

interface Props {
    register: UseFormRegister<IUser>
    errors: FieldErrors<IUser>
}

export const UserFullName = ({ register, errors }: Props) => {
    return (
        <>
            <PersonalInput
                name="firstName"
                placeholder="Имя"
                rules={{
                    required: {
                        value: true,
                        message: "Это поле обязательно для заполнения",
                    },
                }}
                register={register}
                error={errors?.firstName}
            />
            <PersonalInput
                name="lastName"
                placeholder="Фамилия"
                rules={{
                    required: {
                        value: true,
                        message: "Это поле обязательно для заполнения",
                    },
                }}
                register={register}
                error={errors?.lastName}
            />
            <PersonalInput
                name="middleName"
                placeholder="Отчество"
                rules={{
                    required: {
                        value: true,
                        message: "Это поле обязательно для заполнения",
                    },
                }}
                register={register}
                error={errors?.middleName}
            />
        </>

    )
}
