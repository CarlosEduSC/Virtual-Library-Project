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
import { deleteUser } from '../../shared/methods/user/DeleteUser'
import { reactivateUser } from '../../shared/methods/user/ReactivateUser'
import { jwtDecode } from 'jwt-decode'


const UserList = () => {
  const location = useLocation()

  const [isLoading, setIsLoading] = useState(true)

  const [users, setUsers] = useState<IUser[]>([])

  const [selectedUserId, setSelectedUserId] = useState("")

  const [actionType, setActionType] = useState<"delete" | "reactivate" | "">("")

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

  const handleButtonClick = (userId: string, active: boolean) => {
    setSelectedUserId(userId)

    if (active) {
      setActionType("delete")

    } else {
      setActionType("reactivate")
    }
  }

  const fetchUsers = async (selectedFilter: string) => {
    var success = false

    if (selectedFilter == filters[0]) {
      success = await findAllUsers(
        setUsers,
        (errorTitle, errorMessage) => {
          setAlertTitle(errorTitle)
          setAlertMessage(errorMessage)
        }
      )

    } else if (selectedFilter == filters[1]) {
      success = await findAllActiveUsers(
        setUsers,
        (errorTitle, errorMessage) => {
          setAlertTitle(errorTitle)
          setAlertMessage(errorMessage)
        }
      )

    } else if (selectedFilter == filters[2]) {
      success = await findAllAdmins(
        setUsers,
        (errorTitle, errorMessage) => {
          setAlertTitle(errorTitle)
          setAlertMessage(errorMessage)
        }
      )

    } else if (selectedFilter == filters[3]) {
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

  useEffect(() => {
    if (location.state && location.state.alertTitle && location.state.alertMessage) {
      setAlertTitle(location.state.alertTitle);
      setAlertMessage(location.state.alertMessage);
      setIsAlertOpen(true)
    }
  }, [location.state]);

  useEffect(() => {
    fetchUsers(filter)
  }, [filter])

  useEffect(() => {
    const fetchDelete = async () => {
      const success = await deleteUser(
        selectedUserId,
        (alertTitle, alertMessage) => {
          setAlertTitle(alertTitle)
          setAlertMessage(alertMessage)
        }
      )

      if (success) {
        setIsLoading(true)

        fetchUsers(filter)
      }

      setIsAlertOpen(true)

      setActionType("")
    }

    if (actionType == "delete") {
      fetchDelete()
    }
  }, [actionType])

  useEffect(() => {
    const fetchReactivate = async () => {
      const success = await reactivateUser(
        selectedUserId,
        (alertTitle, alertMessage) => {
          setAlertTitle(alertTitle)
          setAlertMessage(alertMessage)
        }
      )

      if (success) {
        setIsLoading(true)

        fetchUsers(filter)
      }

      setIsAlertOpen(true)

      setActionType("")
    }

    if (actionType == "reactivate") {
      fetchReactivate()
    }
  }, [actionType])

  return (
    !isLoading ?
      <div className="user-list">

        <div className='filter'>
          <Select placeholder={filter} options={filters} onOptionSelected={handleFilterSelected} />
        </div>

        {users.length > 1 ?
          <>
            <h1 className='title'>Usuarios</h1>

            <div className='users'>
              {users.map((user) => (
                user.id != (jwtDecode(localStorage.getItem('token') ?? "") as { id: string }).id ?

                  <UserCard user={user} onAction={() => handleButtonClick(user.id, user.active)} />

                  : <></>
              ))}
            </div>
          </>

          :

          <h1 className='title'>
            Sem usuarios

            {
              filter == filters[0] ? " cadastrados!" :
                filter == filters[1] ? " com contas ativas!" :
                  filter == filters[2] ? " do tipo administrador!" :
                    filter == filters[3] ? " do tipo leitor!" : ""}
          </h1>
        }

        {isAlertOpen && <Alert title={alertTitle} message={alertMessage} onClose={() => setIsAlertOpen(false)} />}
      </div>

      :

      <LoadingPage />
  )
}

export default UserList