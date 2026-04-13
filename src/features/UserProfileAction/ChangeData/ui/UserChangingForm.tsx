"use client"

import { Avatar } from "@/shared"
import { Button } from "antd"
import { UserForm } from "@/entities/User"
import { useUserChangingForm } from "../model"
import { FormattedMessage } from "react-intl"
import { FormattedMessageWithValues } from "@/shared/lang"

export const UserChangingForm = () => {
	const {
		handleSubmit,
		register,
		errors,
		isDirty,
		onReset,
		handleSaveChanges,
		currentUser,
	} = useUserChangingForm()

	return (
		<form
			className="flex flex-col gap-12 w-full max-w-120"
			onSubmit={handleSubmit((user) => {
				handleSaveChanges(user)
				console.log("asdasd")
			})}
		>
			<div className="grid grid-cols-[164px_auto] gap-10">
				<Avatar
					size={128}
					className={" self-center justify-self-center"}
				/>
				<div className="flex flex-col gap-6">
					<UserForm.UserFullName
						register={register}
						errors={errors}
						user={currentUser}
					/>
				</div>
			</div>
			<div className="flex flex-col gap-9">
				<UserForm.UserAuthData
					register={register}
					errors={errors}
					user={currentUser}
				/>
				<UserForm.UserPersonalData
					register={register}
					errors={errors}
					user={currentUser}
				/>
			</div>
			<div className="flex justify-between">
				<Button
					className="max-w-50 w-full"
					role="submit"
					disabled={!isDirty}
				>
					<FormattedMessage id="save" />
				</Button>
				<Button
					className="max-w-50 w-full"
					onClick={onReset}
					disabled={!isDirty}
				>
					<FormattedMessageWithValues id="cancle" />
				</Button>
			</div>
		</form>
	)
}
