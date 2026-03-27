import { FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form"

interface Props<T extends FieldValues>{
    name: Path<T>,
    register: UseFormRegister<T>,
    rules?: RegisterOptions<T>,
    error?: FieldError,
    placeholder?: string
    type?: HTMLInputElement['type']
}

export const PersonalInput = <T extends FieldValues>(props: Props<T>) => {

    const {
        register,
        rules,
        error,
        placeholder,
        name,
        type = 'text',
    } = props

    return (
        <label
            className="p-2 rounded-xl bg-foreground border-2 border-stroke hover:border-hover has-focus:border-active focus:border-active active:border-active">
            <input
                className="bg-transparent w-full"
                type={type}
                placeholder={placeholder ?? name}
                {...register(name, rules)}
            />
            {error?.message}
        </label>
    )
}