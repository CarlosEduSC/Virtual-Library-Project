import { useNavigate } from 'react-router-dom'
import { IUser } from '../../shared/interfaces/IUser'
import Button from '../Button'
import CardTextField from '../TextField'
import './index.css'
import { useEffect, useState } from 'react'
import { deleteUser } from '../../shared/methods/user/DeleteUser'

interface UserCardProps {
  user: IUser
  onAction: () => void
  onDelete: (alertTitle: string, alertMessage: string) => void
  page?: string[]
}

const UserCard = ({ user, onAction, onDelete, page = [] }: UserCardProps) => {
  const navigate = useNavigate()

  const [onUserDelete, setOnUserDelete] = useState(false)

  useEffect(() => {
    const fetchUserDelete = async () => {
      await deleteUser(
        user.id,
        (alertTitle, alertMessage) => {
          onDelete(alertTitle, alertMessage)
        }
      )
    }

    if (onUserDelete) {
      fetchUserDelete()
    }

  }, [onUserDelete])

  return (
    <div className='user-card'>

      <img
        className='edit'
        alt='Editar os dados do usuario.'
        src='/images/edit.png'
        onClick={() => navigate("/updateUser/" + user.id, { state: { from: page[0], filter: page[1] } })}
      />

      <h1>{user.name}</h1>

      <CardTextField label='Email'>{user.email}</CardTextField>
      <CardTextField label='Tipo'>{user.type == "ADMIN" ? "Administrador" : "Leitor"}</CardTextField>
      <CardTextField label='Situação da conta do usuario'>{user.active ? "Ativa" : "Desativada"}</CardTextField>

      <div className='bottom'>
        <img
          className='delete'
          alt='Deletar usuario.'
          src='/images/delete.png'
          onClick={() => setOnUserDelete(true)}
        />

        <Button
          isLoading={false}
          height={30}
          fontSize={15}
          borderRadius={7}
          onClick={onAction}

        >{user.active ? "Desativar Conta" : "Reativar Conta"}</Button>
      </div>
    </div>
  )
}

export default UserCard