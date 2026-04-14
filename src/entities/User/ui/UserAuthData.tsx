"use client"

import { useIntl } from "react-intl"
import { PersonalInput } from "@/shared"
import { IUser } from "../lib"
import {
	UseFormRegister,
	FieldErrors,
	FieldValues,
	FieldError,
	Path,
} from "react-hook-form"

type AuthFields = {
	login: string
	password: string
}

interface Props<T extends FieldValues & AuthFields> {
	register: UseFormRegister<T>
	errors: FieldErrors<T>
	user?: IUser
	onChanges?: {
		login?: () => void
		password?: () => void
	}
}

export const UserAuthData = <T extends FieldValues & AuthFields>({ register, errors, user, onChanges }: Props<T>) => {
	const intl = useIntl()

	return (
		<>
			<PersonalInput
				type="login"
				name={"login" as Path<T>}
				autoComplete="username"
				placeholder={intl.formatMessage({ id: "loginPlaceholder" })}
				rules={{
					required: {
						value: true,
						message: intl.formatMessage({ id: "fieldRequired" }),
					},
				}}
				register={register}
				error={errors?.login as FieldError | undefined}
				defaultValue={user?.login}
				onChange={onChanges?.login}
			/>
			<PersonalInput
				type="password"
				name={"password" as Path<T>}
				autoComplete="current-password"
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
				error={errors?.password as FieldError | undefined}
				defaultValue={user?.password}
				onChange={onChanges?.password}
			/>
		</>
	)
}
