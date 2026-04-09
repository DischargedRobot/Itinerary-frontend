// "use client"

import { useIntl } from "react-intl"
import { PersonalInput } from "@/shared"
import { IUser } from "../lib"
import { UseFormRegister, FieldErrors } from "react-hook-form"

interface Props {
	register: UseFormRegister<IUser>
	errors: FieldErrors<IUser>
	user?: IUser | null
}

export const UserFullName = ({ register, errors, user }: Props) => {
	const intl = useIntl()

	return (
		<>
			<PersonalInput
				name="name"
				placeholder={intl.formatMessage({ id: "name" })}
				rules={{
					required: {
						value: true,
						message: intl.formatMessage({ id: "fieldRequired" }),
					},
				}}
				register={register}
				error={errors?.name}
				defaultValue={user?.name}
			/>
			<PersonalInput
				name="secondName"
				placeholder={intl.formatMessage({ id: "secondName" })}
				rules={{
					required: {
						value: true,
						message: intl.formatMessage({ id: "fieldRequired" }),
					},
				}}
				register={register}
				error={errors?.secondName}
				defaultValue={user?.secondName}
			/>
			<PersonalInput
				name="middleName"
				placeholder={intl.formatMessage({ id: "middleName" })}
				rules={{
					required: {
						value: true,
						message: intl.formatMessage({ id: "fieldRequired" }),
					},
				}}
				register={register}
				error={errors?.middleName}
				defaultValue={user?.middleName}
			/>
		</>
	)
}
