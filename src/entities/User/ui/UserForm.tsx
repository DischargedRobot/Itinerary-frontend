// "use client"

import { IUser } from "../lib"
import { UseFormRegister, FieldErrors } from "react-hook-form"
import { UserFullName } from "./UserFullName"
import { UserAuthData } from "./UserAuthData"
import { UserPersonalData } from "./UserPersonalData"

interface Props {
	register: UseFormRegister<IUser>
	errors: FieldErrors<IUser>
	user?: IUser
}

export const UserForm = ({ register, errors, user }: Props) => {
	return (
		<>
			<UserFullName register={register} errors={errors} user={user} />
			<UserAuthData register={register} errors={errors} user={user} />
			<UserPersonalData register={register} errors={errors} user={user} />
		</>
	)
}

UserForm.UserFullName = UserFullName
UserForm.UserAuthData = UserAuthData
UserForm.UserPersonalData = UserPersonalData
