import './index.css'
import { ReactNode } from 'react'

interface BaseFormProps {
  children: ReactNode
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const BaseForm = ({ children, onSubmit }: BaseFormProps) => {
  return (
    <div className='base-form'>
      <form onSubmit={onSubmit} style={{ minWidth: "40%" }}>
        {children}
      </form>
    </div>
  )
}

export default BaseForm