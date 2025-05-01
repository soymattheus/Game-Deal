interface InputProps {
    description: string
    value: string | number
    placeholder?: string
    type?: 'text' | 'number' | 'email' | 'password'
    disabled?: boolean
    required?: boolean
    onChange: (value: any) => void
  }
  
  export default function Input({
    description,
    value,
    placeholder,
    type = 'text',
    disabled = false,
    required,
    onChange,
  }: InputProps) {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-600">
          {description}
        </label>
        <input
          type={type}
          value={value}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="p-2 rounded-md border border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary text-text"
        />
      </div>
    )
  }
  