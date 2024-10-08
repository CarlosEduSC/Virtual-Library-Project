import './index.css'

interface InputProps {
  onAlterado: (value: string) => void
  label?: string
  value: string
  required?: boolean
  placeHolder?: string
  type?: "date" | "text" | "email" | "password" | "number" | "color" | "file"
  minLength?: number
  min?: number
  height?: number
  width?: number
}

const Input = ({ onAlterado, label, value, required = true, placeHolder = "", type = "text", minLength = 8, min = 1, height = 80, width = 100}: InputProps) => {
  const onDigitado = (event: React.ChangeEvent<HTMLInputElement>) => {
    onAlterado(event.target.value)
  }

  return (
    <div className='input' style={{width: width + "%"}}>
      <label>{label}</label>

      <input
        value={value}
        onChange={onDigitado}
        required={required}
        placeholder={placeHolder}
        type={type}
        minLength={minLength}
        min={min}
        style={{height: height + "px"}}
      />
    </div>
  )
}

export default Input