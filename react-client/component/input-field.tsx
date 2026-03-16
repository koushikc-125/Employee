type InputFieldProps = {
    placeholder: string,
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function InputField({ placeholder, value, onChange }: InputFieldProps) {
    return (
        <div className="w-full">
            <input
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="min-h-13 px-5 rounded-full bg-transparent border border-solid w-full"
            />
        </div>
    )
}