import { useEffect, useState } from 'react'
import { IUser } from '../../shared/interfaces/IUser'
import CardTextField from '../CardTextField'
import './index.css'
import { deleteUser } from '../../shared/methods/user/DeleteUser'

interface UserCardProps {
  user: IUser
  onAction: (alertTitle: string, alertMessage: string) => void
}

const UserCard = ({ user, onAction }: UserCardProps) => {
  const [onDeleteSelected, setOnDeleteSelected] = useState(false)



  useEffect(() => {
    const fetchDelete = async () => {
      await deleteUser(
        user.id,
        (alertTitle, alertMessage) => {
          onAction(alertTitle, alertMessage)
        }
      )
    }

    if (onDeleteSelected) {
      fetchDelete()
    }
  }, [])

  return (
    <div className='user-card'>
      <img
        className='delete'
        alt='Desativar conta do usuario'
        src='/images/delete.png'
        onClick={() => setOnDeleteSelected(true)}
      />

      <h1>{user.name}</h1>

      <CardTextField label='Email'>{user.email}</CardTextField>
      <CardTextField label='Tipo'>{user.type == "ADMIN" ? "Administrador" : "Leitor"}</CardTextField>
      <CardTextField label='Situação da conta do usuario'>{user.active ? "Ativa" : "Desativada"}</CardTextField>
    </div>
  )
}

export default UserCard