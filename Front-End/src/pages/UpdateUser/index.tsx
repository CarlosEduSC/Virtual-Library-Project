import { useEffect, useState } from 'react'
import './index.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { IUser } from '../../shared/interfaces/IUser'

const UpdateUser = () => {
  const location = useLocation()
  const navigate = useNavigate()

  if (location.pathname == "/login") {
    localStorage.setItem('token', "")
  }
  
  const [user, setUser] = useState<IUser>()
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordCheck, setPasswordCheck] = useState("")
  const [type, setType] = useState("")
  const [active, setActive] = useState(true)

  const [isLoading, setIsLoading] = useState(false)
  const [submit, setSubmit] = useState(false)

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertTittle, setAlertTittle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (location.state && location.state.alertTittle && location.state.alertMessage) {
      setAlertTittle(location.state.alertTittle);
      setAlertMessage(location.state.alertMessage);
      setIsAlertOpen(true)
    }
  }, [location.state]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsLoading(true)

    const userData: IUser = {
      id,
      name,
      email,
      password,
      type,
      active
    }

    setUser(userData)
    setSubmit(true)
  }

  return (
    <div className='user-form'>
      <form style={{ width: location.pathname == "/logIn" ? "40%" : "" }} onSubmit={handleSubmit}>
        

        {location.pathname != "/logIn" &&
          <TextField
            label='Nome'
            placeHolder='Digite o nome do usuario'
            value={name}
            onAlterado={value => setName(value)}
          />
        }

        <TextField
          label='Email'
          placeHolder='Digite o email do usuario'
          value={email}
          type='email'
          onAlterado={value => setEmail(value)}
        />

        <TextField
          label='Senha'
          placeHolder='Digite a senha do usuario'
          value={password}
          type='password'
          onAlterado={value => setPassword(value)}
        />

        {location.pathname != "/logIn" &&
          <TextField
            label='Confirmar Senha'
            placeHolder='Digite novamente a senha do usuario'
            value={passwordCheck}
            type='password'
            onAlterado={value => setPasswordCheck(value)}
          />
        }

        <Button>{isLoading ?
          <div className='loading'>
            Carregando
            <LoadingSpinner />
          </div> : "Entrar"}
        </Button>

        {isAlertOpen && <Alert tittle={alertTittle} message={alertMessage} onClose={() => setIsAlertOpen(false)} />}
      </form>
    </div>
  )
}

export default UpdateUser