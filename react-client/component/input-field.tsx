type InputFieldProps = {
    placeholder: string,
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    disabled?: boolean
}

export function InputField({ placeholder, value, disabled = false, onChange }: InputFieldProps) {
    return (
        <div className="w-full">
            <input
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="min-h-13 px-5 rounded-full bg-transparent border border-solid w-full"
            />
        </div>
    )
}