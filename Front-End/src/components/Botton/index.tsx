import { ReactElement } from 'react'
import './index.css'

interface ButtonProps {
  children: ReactElement | string
}

const Button = ({children}: ButtonProps) => {
  return (
    <button className='botao'>{children}</button>
  )
}

export default Button