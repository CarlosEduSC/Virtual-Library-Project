import { useLocation, useNavigate } from 'react-router-dom'
import './index.css'
import { useEffect, useState } from 'react'
import { IUser } from '../../shared/interfaces/IUser'
import { login } from '../../shared/methods/user/Login'
import TextField from '../../components/TextField'
import Button from '../../components/Botton'
import LoadingSpinner from '../../components/LoadingSpinner'
import Alert from '../../components/Alert'

const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [user, setUser] = useState<IUser>()
  const [email, setEmail] = useState("")
  const [password, setSenha] = useState("")

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

  console.log("titulo: " + alertTittle + "\nmensagem: " + alertMessage)


  useEffect(() => {
    if (user) {
      const fetchLogin = async () => {

        const token = await login(
          user,
          (errorTittle, errorMessage) => {
            setAlertTittle(errorTittle)
            setAlertMessage(errorMessage)
          }
        )

        if (token) {
          localStorage.setItem('token', token)

          navigate("/")

        } else {
          setIsLoading(false)
          setIsAlertOpen(true)
        }
      }

      if (submit) {
        fetchLogin()
      }
    }
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsLoading(true)

    const userData: IUser = {
      id: "",
      nome: "",
      email,
      senha: password,
      tipo: "",
      status: true
    }

    setUser(userData)
    setSubmit(true)
  }

  return (
    <div className='login'>
      <form className='form' onSubmit={handleSubmit}>
        <h2>Faça login na sua conta!</h2>

        <TextField label='Email' value={email} placeHolder='Digite seu email' onAlterado={value => setEmail(value)} />

        <TextField label='Senha' value={password} type='password' placeHolder='Digite sua senha' onAlterado={value => setSenha(value)} />

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

export default Login