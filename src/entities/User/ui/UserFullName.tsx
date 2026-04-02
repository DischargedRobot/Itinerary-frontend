// "use client"

import { PersonalInput } from "@/shared"
import { IUser } from "../lib"
import { UseFormRegister, FieldErrors } from "react-hook-form"

interface Props {
    register: UseFormRegister<IUser>
    errors: FieldErrors<IUser>
    user?: IUser | null
}

export const UserFullName = ({ register, errors, user }: Props) => {
    return (
        <>
            <PersonalInput
                name="name"
                placeholder="Имя"
                rules={{
                    required: {
                        value: true,
                        message: "Это поле обязательно для заполнения",
                    },
                }}
                register={register}
                error={errors?.name}
                defaultValue={user?.name}
            />
            <PersonalInput
                name="secondName"
                placeholder="Фамилия"
                rules={{
                    required: {
                        value: true,
                        message: "Это поле обязательно для заполнения",
                    },
                }}
                register={register}
                error={errors?.secondName}
                defaultValue={user?.secondName}
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
                defaultValue={user?.middleName}
            />
        </>

    )
}
