import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IUser } from '../../shared/interfaces/IUser'
import FormTextField from '../../components/Input'
import Button from '../../components/Button'
import Alert from '../../components/Alert'
import { login } from '../../shared/methods/user/Login'
import FormTitle from '../../components/FormTitle'
import BaseForm from '../../components/BaseForm'

const Login = () => {
  localStorage.setItem('token', "")

  const location = useLocation()
  const navigate = useNavigate()

  const [user, setUser] = useState<IUser>()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const [submit, setSubmit] = useState(false)

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertTitle, setAlertTitle] = useState("")
  const [alertMessage, setAlertMessage] = useState("")

  useEffect(() => {
    if (location.state && location.state.alertTitle && location.state.alertMessage) {
      setAlertTitle(location.state.alertTitle)
      setAlertMessage(location.state.alertMessage)
      setIsAlertOpen(true)
    }
  }, [location.state]);

  useEffect(() => {
    if (user) {
      const fetchLogin = async () => {

        const token = await login(
          user,
          (errorTittle, errorMessage) => {
            setAlertTitle(errorTittle)
            setAlertMessage(errorMessage)
          }
        )

        if (token) {
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
  }, [submit, user, navigate])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsLoading(true)

    const userData: IUser = {
      id: "",
      name: "",
      email,
      password,
      type: "",
      active: true
    }

    setUser(userData)
    setSubmit(true)
  }

  return (
    <BaseForm onSubmit={handleSubmit}>
      <FormTitle>Faça login na sua conta!</FormTitle>
      <FormTextField label='Email' value={email} placeHolder='Digite seu email' onAlterado={value => setEmail(value)} />

      <FormTextField label='Senha' value={password} type='password' placeHolder='Digite sua senha' onAlterado={value => setPassword(value)} />

      <Button isLoading={isLoading}>Entrar</Button>

      {isAlertOpen && <Alert title={alertTitle} message={alertMessage} onClose={() => setIsAlertOpen(false)} />}
    </BaseForm>
  )
}

export default Login