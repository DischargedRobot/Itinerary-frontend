"use client"

import { useIntl } from "react-intl"
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
	const intl = useIntl()

	return (
		<>
			<PersonalInput
				type="login"
				name="login"
				placeholder={intl.formatMessage({ id: "loginPlaceholder" })}
				rules={{
					required: {
						value: true,
						message: intl.formatMessage({ id: "fieldRequired" }),
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
				placeholder={intl.formatMessage({ id: "passwordPlaceholder" })}
				rules={{
					required: {
						value: true,
						message: intl.formatMessage({ id: "fieldRequired" }),
					},
					minLength: {
						value: 6,
						message: intl.formatMessage({
							id: "passwordMinLength",
						}),
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
