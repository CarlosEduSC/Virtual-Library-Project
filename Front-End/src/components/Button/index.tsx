import { ReactElement } from 'react'
import './index.css'
import LoadingSpinner from '../LoadingSpinner'

interface ButtonProps {
  children: ReactElement | string
  isLoading: boolean
  height?: number
  fontSize?: number
  borderRadius?: number
  onClick?: () => void
}

const Button = ({ children, isLoading, height = 80, fontSize = 18, borderRadius = 10, onClick }: ButtonProps) => {
  return (
    <button
      className='button'
      style={{
        height: height + "px",
        fontSize: fontSize + "px",
        borderRadius: borderRadius + "px"
      }}
      onClick={onClick}>

      {isLoading ?
        <div className='loading'>
          Carregando

          <LoadingSpinner />
        </div>

        : children
      }
    </button>
  )
}

export default Button