interface SelectProps {
  children: React.ReactNode
  description: string
  value?: string
  disabled?: boolean
  required?: boolean
  onChange: (value: string) => void
}

export default function Select({ children, description, value, disabled = false, required, onChange }: SelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="service" className="text-sm font-semibold text-gray-600">
        {description}
      </label>
      <select
        id="service"
        name="service"
        value={value}
        required={required}
        disabled={disabled}
        onChange={e => onChange(e.target.value)}
        className="p-2 rounded-md border border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
      >
        {children}
      </select>
    </div>
  )
}
