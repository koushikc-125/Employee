type ButtonProps = {
    text: string,
    textColor?: string,
    backgroundColor?: string,
    hoverBgColor?: string,
    disabled?: boolean,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
}

export function Button({ onClick, text, disabled = false, textColor = "text-(--subdued)", backgroundColor = "bg-(--secondary)", hoverBgColor = "hover:" }: ButtonProps) {
    return (
        <div className="w-full">
            <button
                onClick={onClick}
                disabled={disabled}
                className={`min-h-13 rounded-full ${backgroundColor} w-full ${textColor} cursor-pointer ${hoverBgColor}`}>
                {text}
            </button>
        </div>
    )
}