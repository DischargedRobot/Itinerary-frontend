// "use client"

import { useIntl } from "react-intl"
import { PersonalInput } from "@/shared"
import { IUser } from "../lib"
import { UseFormRegister, FieldErrors } from "react-hook-form"

interface Props {
	register: UseFormRegister<IUser>
	errors: FieldErrors<IUser>
	user?: IUser
}

export const UserPersonalData = ({ register, errors, user }: Props) => {
	const intl = useIntl()

	return (
		<>
			<PersonalInput
				type="email"
				name="email"
				placeholder={intl.formatMessage({ id: "email" })}
				register={register}
				error={errors?.email}
				defaultValue={user?.email}
			/>
			<PersonalInput
				type="tel"
				name="phoneNumber"
				placeholder={intl.formatMessage({ id: "phone" })}
				register={register}
				error={errors?.phoneNumber}
				defaultValue={user?.phoneNumber}
			/>
		</>
	)
}
