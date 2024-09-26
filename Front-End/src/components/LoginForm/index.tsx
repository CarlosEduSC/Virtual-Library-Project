import React, { useEffect, useState } from 'react'
import Button from '../Botton'
import TextField from '../TextField'
import './index.css'
import { IUser } from '../../shared/interfaces/IUser'
import { login } from '../../shared/methods/user/Login'
import { findAllUsers } from '../../shared/methods/user/FindAllUsers'

const LoginForm = () => {
  const [user, setUser] = useState<IUser>()
  const [email, setEmail] = useState("")
  const [password, setSenha] = useState("")

  const [message, setMessage] = useState<string | null>(null);

  const [submit, setSubmit] = useState(false)

  const [colaboradores, setColaboradores] = useState<IUser[]>()

  useEffect(() => {
    if (user) {
      const fetchLogin = async () => {

        const token = await login(
          user,
          (errorMessage) => {
            setMessage(errorMessage)
          }
        )

        console.log("token: " + token)
      }

      if (submit) {
        fetchLogin()
      }
    }
  }, [])

  useEffect(() => {
    const fetchColaboradores = async () => {
      try {
        const colaboradores = await findAllUsers((errorMessage) => {
          setMessage(errorMessage)
        });
        setColaboradores(colaboradores);
      } catch (error) {
        console.error('Erro ao buscar colaboradores', error);
      }
    };

    fetchColaboradores();

  }, [colaboradores]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

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
    <form className='login-form' onSubmit={handleSubmit}>
      <h2>Faça login na sua conta!</h2>

      <TextField label='Email' value={email} placeHolder='Digite seu email' onAlterado={value => setEmail(value)} />

      <TextField label='Senha' value={password} type='password' placeHolder='Digite sua senha' onAlterado={value => setSenha(value)} />

      <Button>Entrar</Button>
    </form>
  )
}

export default LoginForm