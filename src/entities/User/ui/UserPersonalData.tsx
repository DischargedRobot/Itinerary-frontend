// "use client"

import { PersonalInput } from "@/shared"
import { IUser } from "../lib"
import { UseFormRegister, FieldErrors } from "react-hook-form"

interface Props {
    register: UseFormRegister<IUser>
    errors: FieldErrors<IUser>
    user?: IUser
}

export const UserPersonalData = ({ register, errors, user }: Props) => {
    return (
        <>
            <PersonalInput
                type="email"
                name="email"
                placeholder="Почта"
                register={register}
                error={errors?.email}
                defaultValue={user?.email}
            />
            <PersonalInput
                type="tel"
                name="phoneNumber"
                placeholder="Телефон"
                register={register}
                error={errors?.phoneNumber}
                defaultValue={user?.phoneNumber}
            />
        </>
    )
}
