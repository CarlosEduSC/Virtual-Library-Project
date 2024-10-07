import { ReactElement } from 'react'
import './index.css'

interface TextFieldProps {
  label: string,
  children: ReactElement | string
}

const TextField = ({ label, children }: TextFieldProps) => {

  return (
    <p className='text-field'><b>{label}:</b> {children}</p>
  )
}

export default TextField