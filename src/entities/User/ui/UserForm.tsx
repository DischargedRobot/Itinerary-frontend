// "use client"

import { IUser } from "../lib"
import { UseFormRegister, FieldErrors } from "react-hook-form"
import { UserFullName } from "./UserFullName"
import { UserAuthData } from "./UserAuthData"
import { UserPersonalData } from "./UserPersonalData"

interface Props {
    register: UseFormRegister<IUser>
    errors: FieldErrors<IUser>
}

export const UserForm = ({ register, errors }: Props) => {
    return (
        <>
            <UserFullName register={register} errors={errors} />
            <UserAuthData register={register} errors={errors} />
            <UserPersonalData register={register} errors={errors} />
        </>
    )
}

UserForm.UserFullName = UserFullName
UserForm.UserAuthData = UserAuthData
UserForm.UserPersonalData = UserPersonalData
