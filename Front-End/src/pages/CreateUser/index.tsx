import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IUser } from '../../shared/interfaces/IUser'
import FormTextField from '../../components/FormTextField'
import Alert from '../../components/Alert'
import BaseForm from '../../components/BaseForm'
import Button from '../../components/Button'
import FormTitle from '../../components/FormTitle'
import { createUser } from '../../shared/methods/user/CreateUser'
import Select from '../../components/Select'

const CreateUser = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [user, setUser] = useState<IUser>()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordCheck, setPasswordCheck] = useState("")
  const [type, setType] = useState("")

  const types = ["Leitor", "Administrador"]

  const [isLoading, setIsLoading] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [successState, setSuccessState] = useState(false)

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
    const fetchSubmit = async () => {
      if (user) {
        const success = await createUser(
          user,
          (alertTitle, alertMessage) => {
            setAlertTitle(alertTitle)
            setAlertMessage(alertMessage)
          }
        )

        if (success) {
          setSuccessState(true);

          setIsLoading(false);
        
        } else {
          setIsLoading(false);
          
          setIsAlertOpen(true);
        }
      }
    }

    if (submit) {
      fetchSubmit()
    }

  }, [submit, user])

  useEffect(() => {
    if (successState) {
      const stateData = {
        from: location,
        alertTitle,
        alertMessage
      };

      navigate("/listUsers", { state: stateData, replace: true });
    }
  }, [successState, alertTitle, alertMessage, navigate, location]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsLoading(true)

    if (password == passwordCheck && (type == "ADMIN" || type == "READER")) {
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
      setAlertTitle("Dados inválidos!")

      if (password != passwordCheck) {
        setAlertMessage("A confirmação de senha não condiz com a senha digitada.")
      
      } else {
        setAlertMessage("O tipo de usuario que sera criado não foi selecionado.")
      }

      setIsAlertOpen(true)

      setIsLoading(false)
    }
  }

  return (
    <BaseForm onSubmit={handleSubmit}>

      <FormTitle>Preencha os campos abaixo para cadastrar um novo usuário.</FormTitle>

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

      <Select label='Tipo' placeholder='Selecione o tipo do usuario' options={types} onOptionSelected={handleTypeSelected} />

      <Button isLoading={isLoading}>Cadastrar</Button>

      {isAlertOpen && <Alert title={alertTitle} message={alertMessage} onClose={() => setIsAlertOpen(false)} />}
    </BaseForm>
  )
}

export default CreateUser