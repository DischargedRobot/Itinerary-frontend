"use client"

import { Avatar, PersonalInput } from "@/shared"
import { useForm } from "react-hook-form"
import { IPersonalFormValues } from "../lib"
import { useEffect } from "react"
import { Button } from "antd"

export const User = () => {
	const {
		handleSubmit,
		register,
		formState: { errors, isDirty },
		reset,
	} = useForm<IPersonalFormValues>()

	useEffect(() => {
		console.log(isDirty)
	})
	return (
		<form
			className="flex flex-col gap-12 w-full max-w-120"
			onSubmit={handleSubmit(() => {
				console.log("asdasd")
			})}
		>
			<div className="grid grid-cols-[164px_auto] gap-10">
				<Avatar
					size={128}
					className={" self-center justify-self-center"}
				/>
				<div className="flex flex-col gap-6">
					<PersonalInput
						name="firstName"
						placeholder="Имя"
						rules={{
							required: {
								value: true,
								message: "Это поле обязательно для заполнения",
							},
						}}
						register={register}
						error={errors?.firstName}
					/>
					<PersonalInput
						name="lastName"
						placeholder="Фамилия"
						rules={{
							required: {
								value: true,
								message: "Это поле обязательно для заполнения",
							},
						}}
						register={register}
						error={errors?.lastName}
					/>
					<PersonalInput
						name="patronymic"
						placeholder="Отчество"
						rules={{
							required: {
								value: true,
								message: "Это поле обязательно для заполнения",
							},
						}}
						register={register}
						error={errors?.patronymic}
					/>
				</div>
			</div>
			<div className="flex flex-col gap-9">
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
				/>
				<PersonalInput
					type="password"
					name="password"
					placeholder="Парроль"
					rules={{
						required: {
							value: true,
							message: "Это поле обязательно для заполнения",
						},
						minLength: {
							value: 6,
							message:
								"Пароль должен состоять минимум из 6 символов",
						},
					}}
					register={register}
					error={errors?.password}
				/>
				<PersonalInput
					type="email"
					name="email"
					placeholder="Почта"
					register={register}
					error={errors?.email}
				/>
			</div>
			<div className="flex justify-between">
				<Button
					className="max-w-50 w-full"
					role="submit"
					disabled={!isDirty}
				>
					Сохранить
				</Button>
				<Button
					className="max-w-50 w-full"
					onClick={() =>
						reset({
							firstName: "",
							lastName: "",
							patronymic: "",
							login: "",
							password: "",
							email: "",
						})
					}
					disabled={!isDirty}
				>
					Отменить
				</Button>
			</div>
		</form>
	)
}
