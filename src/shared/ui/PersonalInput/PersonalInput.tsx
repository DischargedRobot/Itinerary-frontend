import { FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form"

interface Props<T extends FieldValues>{
    name: Path<T>,
    register: UseFormRegister<T>,
    rules?: RegisterOptions<T>,
    error?: FieldError,
    placeholder?: string
}

export const PersonalInput = <T extends FieldValues>(props: Props<T>) => {

    const {
        register,
        rules,
        error,
        placeholder,
        name,
    } = props

    return (
        <label>
            <input
                type="text"
                placeholder={placeholder ?? name}
                {...register(name, rules)}
            />
            {error}
        </label>
    )
}