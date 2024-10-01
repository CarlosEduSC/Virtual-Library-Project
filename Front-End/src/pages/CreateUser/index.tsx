import { useEffect, useState } from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { IUser } from '../../shared/interfaces/IUser'
import TextField from '../../components/TextField'
import Alert from '../../components/Alert'
import BaseForm from '../../components/BaseForm'
import Button from '../../components/Button'
import FormTitle from '../../components/FormTitle'
import TypeSelect from '../../components/TypeSelect'

const CreateUser = () => {
  const navigate = useNavigate()

  if (location.pathname == "/login") {
    localStorage.setItem('token', "")
  }

  const [user, setUser] = useState<IUser>()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordCheck, setPasswordCheck] = useState("")
  const [type, setType] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const [submit, setSubmit] = useState(false)

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertTittle, setAlertTittle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleTypeSelected = (typeSelected: string) => {
    if (typeSelected == "Leitor") {
      setType("LEITOR")
    
    } else {
      setType("ADMIN")
    }
  }

  useEffect(() => {
    const fetchSubmit = async () => {
      if (user) {
        
      }
    }

  }, [submit])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsLoading(true)

    if (password == passwordCheck) {
      const userData: IUser = {
        id: "",
        name,
        email,
        password,
        type,
        active: true
      }
  
      setUser(userData)
      setSubmit(true)
    
    } else {
      setAlertTittle("Dados inválidos!")
      setAlertMessage("A confirmação de senha não condiz com a senha digitada.")

      setIsAlertOpen(true)

      setIsLoading(false)
    }
  }

  return (
    <BaseForm onSubmit={handleSubmit}>

      <FormTitle>Preencha os campos abaixo para cadastrar um novo usuário.</FormTitle>

      <TextField
        label='Nome'
        placeHolder='Digite o nome do usuario'
        value={name}
        onAlterado={value => setName(value)}
        minLength={3}
      />

      <TextField
        label='Email'
        placeHolder='Digite o email do usuario'
        value={email}
        type='email'
        onAlterado={value => setEmail(value)}
        minLength={5}
      />

      <TextField
        label='Senha'
        placeHolder='Digite a senha do usuario'
        value={password}
        type='password'
        onAlterado={value => setPassword(value)}
      />

      <TextField
        label='Confirmar Senha'
        placeHolder='Digite novamente a senha do usuario'
        value={passwordCheck}
        type='password'
        onAlterado={value => setPasswordCheck(value)}
      />

      <TypeSelect options={["Leitor", "Administrador"]} onOptionSelected={handleTypeSelected}/>

      <Button isLoading={isLoading}>Cadastrar</Button>

      {isAlertOpen && <Alert tittle={alertTittle} message={alertMessage} onClose={() => setIsAlertOpen(false)} />}
    </BaseForm>
  )
}

export default CreateUser