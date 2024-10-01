import { ReactElement } from 'react'
import './index.css'

interface FormTitleProps {
    children: ReactElement | string
  }

const FormTitle = ({children}: FormTitleProps) => {
  return (
    <h2 className='form-title'>{children}</h2>
  )
}

export default FormTitle