import { useNavigate } from 'react-router-dom'
import { IUser } from '../../shared/interfaces/IUser'
import Button from '../Button'
import CardTextField from '../CardTextField'
import './index.css'

interface UserCardProps {
  user: IUser
  onAction: () => void
}

const UserCard = ({ user, onAction }: UserCardProps) => {
  const navigate = useNavigate()

  return (
    <div className='user-card'>

      <img className='edit' alt='Editar os dados do usuario.' src='/images/edit.png' onClick={() => navigate("/updateUser/" + user.id)}/>

      <h1>{user.name}</h1>

      <CardTextField label='Email'>{user.email}</CardTextField>
      <CardTextField label='Tipo'>{user.type == "ADMIN" ? "Administrador" : "Leitor"}</CardTextField>
      <CardTextField label='Situação da conta do usuario'>{user.active ? "Ativa" : "Desativada"}</CardTextField>

      <div className='active'>
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