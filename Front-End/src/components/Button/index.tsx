import { ReactElement} from 'react'
import './index.css'
import LoadingSpinner from '../LoadingSpinner'

interface ButtonProps {
  children: ReactElement | string,
  isLoading: boolean
}

const Button = ({ children, isLoading }: ButtonProps) => {
  return (
    <button className='button'>
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