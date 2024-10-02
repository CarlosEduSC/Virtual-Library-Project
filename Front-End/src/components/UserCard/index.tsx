import { IUser } from '../../shared/interfaces/IUser'
import CardTextField from '../CardTextField'
import './index.css'

interface UserCardProps {
  user: IUser
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className='user-card'>
      <h1>{user.name}</h1>

      <CardTextField label='Email'>{user.email}</CardTextField>
      <CardTextField label='Tipo'>{user.type == "ADMIN" ? "Administrador" : "Leitor"}</CardTextField>
      <CardTextField label='Situação da conta do usuario'>{user.active ? "Ativa" : "Desativada"}</CardTextField>
    </div>
  )
}

export default UserCard