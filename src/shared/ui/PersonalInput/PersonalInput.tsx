import {
	FieldError,
	FieldValues,
	Path,
	RegisterOptions,
	UseFormRegister,
} from "react-hook-form"

interface Props<T extends FieldValues> {
	name: Path<T>
	register: UseFormRegister<T>
	rules?: RegisterOptions<T>
	error?: FieldError
	placeholder?: string
	type?: HTMLInputElement["type"]
	autoComplete?: HTMLInputElement["autocomplete"]
	defaultValue?: string
	onChange?: () => void
}

export const PersonalInput = <T extends FieldValues>(props: Props<T>) => {
	const {
		register,
		rules,
		error,
		placeholder,
		name,
		type = "text",
		autoComplete,
		defaultValue,
		onChange,
	} = props

	return (
		<label className="text-red-400">
			<input
				defaultValue={defaultValue ?? ""}
				className=" w-full p-2 rounded-xl text-text bg-foreground border-2 border-stroke hover:border-hover has-focus:border-active focus:border-active active:border-active"
				type={type}
				autoComplete={autoComplete}
				placeholder={placeholder ?? name}
				{...register(name, rules)}
				onChange={(e) => {
					onChange?.()
					register(name, rules).onChange?.(e)
				}}
			/>
			{error?.message}
		</label>
	)
}
