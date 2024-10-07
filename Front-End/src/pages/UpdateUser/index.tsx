import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { IUser } from '../../shared/interfaces/IUser'
import BaseForm from '../../components/BaseForm'
import FormTitle from '../../components/FormTitle'
import FormTextField from '../../components/Input'
import Select from '../../components/Select'
import Button from '../../components/Button'
import Alert from '../../components/Alert'
import { findUserById } from '../../shared/methods/user/FindUserById'
import LoadingPage from '../LoadingPage'
import { updateUser } from '../../shared/methods/user/UpdateUser'

const UpdateUser = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { userId } = useParams()

  const [user, setUser] = useState<IUser>()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [type, setType] = useState("")

  const [navigateWithState, setNavigateWithState] = useState(false)

  const types = ["Leitor", "Administrador"]

  const [pageLoading, setPageLoading] = useState(true)
  const [submit, setSubmit] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)

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
        (userData) => {
          setName(userData.name ?? "")
          setEmail(userData.email ?? "")
          setType(userData.type)
        },
        (errorTitle, errorMessage) => {
          setAlertTitle(errorTitle)
          setAlertMessage(errorMessage)
        })

      if (success) {
        setPageLoading(false)

      } else {
        setNavigateWithState(true)
      }
    }

    if (userId) {
      fetchUser()
    }
  }, [userId])

  useEffect(() => {
    if (navigateWithState) {
      const stateData = {
        from: location,
        alertTitle,
        alertMessage,
        filter: location.state.filter
      };

      navigate(location.state.from, { state: stateData, replace: true });
    }
  }, [navigateWithState, alertTitle, alertMessage, navigate, location]);

  useEffect(() => {
    const fetchUpdate = async () => {
      if (user) {
        const success = await updateUser(
          user, 
        (alertTitle, alertMessage) => {
          setAlertTitle(alertTitle)
          setAlertMessage(alertMessage)
        })

        if (success) {
          setNavigateWithState(true)
        
        } else {
          setSubmitLoading(false)
          setIsAlertOpen(true)
        }
      }
    }

    if (submit) {
      fetchUpdate()
    }
  }, [submit])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSubmitLoading(true)

    const userData: IUser = {
      id: userId ?? "",
      name,
      email,
      password: "",
      type,
      active: user?.active ?? true
    }

    setUser(userData)
    setSubmit(true)
  }

  return (
    !pageLoading ? <BaseForm onSubmit={handleSubmit}>

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

      <Select label='Tipo' placeholder={type == "ADMIN" ? types[1] : types[0]} options={types} onOptionSelected={handleTypeSelected} />

      <Button isLoading={submitLoading}>Cadastrar</Button>

      {isAlertOpen && <Alert title={alertTitle} message={alertMessage} onClose={() => setIsAlertOpen(false)} />}
    </BaseForm> :

      <LoadingPage />
  )
}

export default UpdateUser