"use client"

import { Button } from "antd"
import { UserAuthData } from "@/entities/User"
import { useUserAuthorizationForm } from "../model"

export const UserAuthorization = () => {
	const {
		handleSubmit,
		register,
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
					Войти
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
					Очистить
				</Button>
			</div>
		</form>
	)
}
