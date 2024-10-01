import './index.css'

interface TextFieldProps {
  onAlterado: (value: string) => void
  label: string
  value: string
  required?: boolean
  placeHolder?: string
  type?: "date" | "text" | "email" | "password" | "number" | "color"
  minLength?: number
}

const TextField = ({ onAlterado, label, value, required = true, placeHolder = "", type = "text", minLength = 8}: TextFieldProps) => {
  const onDigitado = (event: React.ChangeEvent<HTMLInputElement>) => {
    onAlterado(event.target.value)
  }

  return (
    <div className='campo-texto'>
      <label>{label}</label>

      <input
        value={value}
        onChange={onDigitado}
        required={required}
        placeholder={placeHolder}
        type={type}
        minLength={minLength}
      />
    </div>
  )
}

export default TextField