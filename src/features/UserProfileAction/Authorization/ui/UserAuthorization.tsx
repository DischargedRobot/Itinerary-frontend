"use client"

import { useIntl } from "react-intl"
import { Button, Checkbox } from "antd"
import { Controller } from "react-hook-form"
import { UserAuthData } from "@/entities/User"
import { useUserAuthorizationForm } from "../model"
import { FormattedMessageWithValues } from "@/shared/lang"

export const UserAuthorization = () => {
	const {
		handleSubmit,
		register,
		control,
		errors,
		isDirty,
		reset,
		handleLogin,
		formErrors,
		setFormErrors,
	} = useUserAuthorizationForm()

	const handleClearErrors = () => {
		setFormErrors(null)
	}

	return (
		<form
			className="flex flex-col gap-12 w-full max-w-120"
			autoComplete="on"
			onSubmit={handleSubmit((data) => {
				handleLogin(data)
			})}
		>
			{formErrors?.common && (
				<p className="text-red-500">{formErrors.common}</p>
			)}
			<div className="flex flex-col gap-9">
				<UserAuthData
					register={register}
					errors={errors}
					onChanges={{
						login: handleClearErrors,
						password: handleClearErrors,
					}}
				/>
			</div>

			<div className="flex justify-between">
				<Button
					className="max-w-50 w-full"
					htmlType="submit"
					disabled={!isDirty}
				>
					<FormattedMessageWithValues id="login" />
				</Button>
				<Button
					className="max-w-50 w-full"
					onClick={() =>
						reset({
							login: "",
							password: "",
						})
					}
					disabled={!isDirty}
				>
					<FormattedMessageWithValues id="clear" />
				</Button>
			</div>
		</form >
	)
}
