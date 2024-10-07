import './index.css'

interface InputProps {
  onAlterado: (value: string) => void
  label?: string
  value: string
  required?: boolean
  placeHolder?: string
  type?: "date" | "text" | "email" | "password" | "number" | "color"
  minLength?: number
  height?: number
}

const Input = ({ onAlterado, label, value, required = true, placeHolder = "", type = "text", minLength = 8, height = 80}: InputProps) => {
  const onDigitado = (event: React.ChangeEvent<HTMLInputElement>) => {
    onAlterado(event.target.value)
  }

  return (
    <div className='input'>
      <label>{label}</label>

      <input
        value={value}
        onChange={onDigitado}
        required={required}
        placeholder={placeHolder}
        type={type}
        minLength={minLength}
        style={{height: height + "px"}}
      />
    </div>
  )
}

export default Input