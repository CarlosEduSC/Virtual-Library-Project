import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { IUser } from '../../shared/interfaces/IUser'
import BaseForm from '../../components/BaseForm'
import FormTitle from '../../components/FormTitle'
import FormTextField from '../../components/FormTextField'
import Select from '../../components/Select'
import Button from '../../components/Button'
import Alert from '../../components/Alert'
import { findUserById } from '../../shared/methods/user/FindUserById'
import LoadingPage from '../LoadingPage'

const UpdateUser = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const {userId} = useParams()

  const [user, setUser] = useState<IUser>()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordCheck, setPasswordCheck] = useState("")
  const [type, setType] = useState("")

  const types = ["Leitor", "Administrador"]

  const [isLoading, setIsLoading] = useState(true)
  const [submit, setSubmit] = useState(false)

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleTypeSelected = (typeSelected: string) => {
    if (typeSelected == "Leitor") {
      setType("READER")

    } else if (typeSelected == "Administrador") {
      setType("ADMIN")
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      const success = await findUserById(
        userId ?? "",
        setUser,
      (errorTitle, errorMessage) => {
        setAlertTitle(errorTitle)
        setAlertMessage(errorMessage)
      })

      if (success) {
        setName(user?.name ?? "")
        setEmail(user?.email ?? "")
        setType(user?.type ?? "")

        setIsLoading(false)
      
      } else {

      }
    }

    if (userId) {
      fetchUser()
    }
  })

  useEffect(() => {
    if (location.state && location.state.alertTitle && location.state.alertMessage) {
      setAlertTitle(location.state.alertTitle);
      setAlertMessage(location.state.alertMessage);
      setIsAlertOpen(true)
    }
  }, [location.state]);

  if (location.pathname == "/login") {
    localStorage.setItem('token', "")
  }

  useEffect(() => {
    if (location.state && location.state.alertTittle && location.state.alertMessage) {
      setAlertTitle(location.state.alertTittle);
      setAlertMessage(location.state.alertMessage);
      setIsAlertOpen(true)
    }
  }, [location.state]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsLoading(true)

    const userData: IUser = {
      id: userId ?? "",
      name,
      email,
      password,
      type,
      active: user?.active ?? true
    }

    setUser(userData)
    setSubmit(true)
  }

  return (
    !isLoading ? <BaseForm onSubmit={handleSubmit}>

      <FormTitle>Altere os dados do usuário conforme nescessario.</FormTitle>

      <FormTextField
        label='Nome'
        placeHolder='Digite o nome do usuario'
        value={name}
        onAlterado={value => setName(value)}
        minLength={3}
      />

      <FormTextField
        label='Email'
        placeHolder='Digite o email do usuario'
        value={email}
        type='email'
        onAlterado={value => setEmail(value)}
        minLength={5}
      />

      <FormTextField
        label='Senha'
        placeHolder='Digite a senha do usuario'
        value={password}
        type='password'
        onAlterado={value => setPassword(value)}
      />

      <FormTextField
        label='Confirmar Senha'
        placeHolder='Digite novamente a senha do usuario'
        value={passwordCheck}
        type='password'
        onAlterado={value => setPasswordCheck(value)}
      />

      <Select label='Tipo' placeholder={type} options={types} onOptionSelected={handleTypeSelected} />

      <Button isLoading={isLoading}>Cadastrar</Button>

      {isAlertOpen && <Alert title={alertTitle} message={alertMessage} onClose={() => setIsAlertOpen(false)} />}
    </BaseForm> :

    <LoadingPage/>
  )
}

export default UpdateUser