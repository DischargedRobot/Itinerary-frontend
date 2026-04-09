"use client"

import { PersonalInput } from "@/shared"
import { IUser } from "../lib"
import { UseFormRegister, FieldErrors } from "react-hook-form"

interface Props {
	register: UseFormRegister<IUser>
	errors: FieldErrors<IUser>
	user?: IUser
	onChanges?: {
		login?: () => void
		password?: () => void
	}
}

export const UserAuthData = ({ register, errors, user, onChanges }: Props) => {
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
				defaultValue={user?.login}
				onChange={onChanges?.login}
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
						message: "Пароль должен состоять минимум из 6 символов",
					},
				}}
				register={register}
				error={errors?.password}
				defaultValue={user?.password}
				onChange={onChanges?.password}
			/>
		</>
	)
}
