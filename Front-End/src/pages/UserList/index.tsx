import { useEffect, useState } from 'react'
import './index.css'
import { IUser } from '../../shared/interfaces/IUser'
import { findAllUsers } from '../../shared/methods/user/FindAllUsers'
import UserCard from '../../components/UserCard'
import Alert from '../../components/Alert'
import { useLocation } from 'react-router-dom'
import LoadingPage from '../LoadingPage'
import Select from '../../components/Select'
import { findAllActiveUsers } from '../../shared/methods/user/FindAllActiveUsers'
import { findAllAdmins } from '../../shared/methods/user/FindAllAdmins'
import { findAllReaders } from '../../shared/methods/user/FindAllReaders'


const UserList = () => {
  const location = useLocation()

  const [isLoading, setIsLoading] = useState(true)

  const [users, setUsers] = useState<IUser[]>([])

  const filters = [
    "Todos os usuários",
    "Somente contas ativas",
    "Apenas administradores",
    "Apenas leitores"
  ]

  const [filter, setFilter] = useState(filters[0])

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertTitle, setAlertTitle] = useState("")
  const [alertMessage, setAlertMessage] = useState("")

  const handleFilterSelected = (filterSelected: string) => {
    setIsLoading(true)
    setFilter(filterSelected)
  }

  useEffect(() => {
    if (location.state && location.state.alertTitle && location.state.alertMessage) {
      setAlertTitle(location.state.alertTitle);
      setAlertMessage(location.state.alertMessage);
      setIsAlertOpen(true)
    }
  }, [location.state]);

  useEffect(() => {
    const fetchUsers = async () => {
      var success = false

      if (filter == filters[0]) {
        success = await findAllUsers(
          setUsers,
          (errorTitle, errorMessage) => {
            setAlertTitle(errorTitle)
            setAlertMessage(errorMessage)
          }
        )

      } else if (filter == filters[1]) {
        success = await findAllActiveUsers(
          setUsers,
          (errorTitle, errorMessage) => {
            setAlertTitle(errorTitle)
            setAlertMessage(errorMessage)
          }
        )

      } else if (filter == filters[2]) {
        success = await findAllAdmins(
          setUsers,
          (errorTitle, errorMessage) => {
            setAlertTitle(errorTitle)
            setAlertMessage(errorMessage)
          }
        )

      } else if (filter == filters[3]) {
        success = await findAllReaders(
          setUsers,
          (errorTitle, errorMessage) => {
            setAlertTitle(errorTitle)
            setAlertMessage(errorMessage)
          }
        )
      }

      if (!success) {
        setIsLoading(false)
        setIsAlertOpen(true)

      } else {
        setIsLoading(false)
      }
    }

    fetchUsers()

  }, [filter])

  return (
    !isLoading ?
      <div className="user-list">

        <div className='filter'>
          <Select placeholder={filter} options={filters} onOptionSelected={handleFilterSelected} />
        </div>

        <h1 className='title'>Usuarios</h1>

        <div className='users'>
          {users.map((user) => (
            <UserCard user={user} />
          ))}

          {isAlertOpen && <Alert title={alertTitle} message={alertMessage} onClose={() => setIsAlertOpen(false)} />}
        </div>
      </div>

      :

      <LoadingPage />
  )
}

export default UserList