import { ReactElement } from 'react'
import './index.css'

interface CardTextFieldProps {
  label: string,
  children: ReactElement | string
}

const CardTextField = ({ label, children }: CardTextFieldProps) => {

  return (
    <p className='card-text-field'><b>{label}:</b> {children}</p>
  )
}

export default CardTextField