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
import { deactivateUser } from '../../shared/methods/user/DeactivateUser'
import { reactivateUser } from '../../shared/methods/user/ReactivateUser'
import { jwtDecode } from 'jwt-decode'
import { findAllInactiveUsers } from '../../shared/methods/user/FindAllInactiveUsers'
import Input from '../../components/Input'


const UserList = () => {
  const location = useLocation()

  const [isLoading, setIsLoading] = useState(true)

  const [users, setUsers] = useState<IUser[]>([])

  const [search, setSearch] = useState("")

  const [selectedUserId, setSelectedUserId] = useState("")

  const [actionType, setActionType] = useState<"delete" | "reactivate" | "">("")

  const filters = [
    "Todos os usuários",
    "Somente contas ativas",
    "Somente contas desativadas",
    "Apenas administradores",
    "Apenas leitores"
  ]

  const [filterChange, setFilterChange] = useState(false)

  const [filter, setFilter] = useState(filters[0])

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertTitle, setAlertTitle] = useState("")
  const [alertMessage, setAlertMessage] = useState("")

  const handleFilterSelected = (filterSelected: string) => {
    setIsLoading(true)
    setFilterChange(true)
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

  const handleUserDelete = (alertTitle: string, alertMessage: string) => {
    handleFilterSelected(filter)

    setAlertTitle(alertTitle)
    setAlertMessage(alertMessage)

    setIsAlertOpen(true)
  }

  const fetchUsers = async (selectedFilter: string) => {
    var success = false

    if (selectedFilter == filters[0]) {
      success = await findAllUsers(
        setUsers,
        (errorTitle, errorMessage) => {
          if (errorTitle != null && errorMessage != null) {
            setAlertTitle(errorTitle)
            setAlertMessage(errorMessage)
          }
        }
      )

    } else if (selectedFilter == filters[1]) {
      success = await findAllActiveUsers(
        setUsers,
        (errorTitle, errorMessage) => {
          if (errorTitle != null && errorMessage != null) {
            setAlertTitle(errorTitle)
            setAlertMessage(errorMessage)
          }
        }
      )

    } else if (selectedFilter == filters[2]) {
      success = await findAllInactiveUsers(
        setUsers,
        (errorTitle, errorMessage) => {
          if (errorTitle != null && errorMessage != null) {
            setAlertTitle(errorTitle)
            setAlertMessage(errorMessage)
          }
        }
      )

    } else if (selectedFilter == filters[3]) {
      success = await findAllAdmins(
        setUsers,
        (errorTitle, errorMessage) => {
          if (errorTitle != null && errorMessage != null) {
            setAlertTitle(errorTitle)
            setAlertMessage(errorMessage)
          }
        }
      )

    } else if (selectedFilter == filters[4]) {
      success = await findAllReaders(
        setUsers,
        (errorTitle, errorMessage) => {
          if (errorTitle != null && errorMessage != null) {
            setAlertTitle(errorTitle)
            setAlertMessage(errorMessage)
          }
        }
      )
    }

    setFilterChange(false)

    if (!success) {
      setIsLoading(false)
      setIsAlertOpen(true)

    } else {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (location.state && location.state.filter) {
      setFilter(location.state.filter)
    }
  }, [location.state]);

  useEffect(() => {
    fetchUsers(filter)
  }, [filterChange])

  useEffect(() => {
    const fetchDelete = async () => {
      const success = await deactivateUser(
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

        <div className='name-search'>
          <Input value={search} onAlterado={value => setSearch(value)} placeHolder='Procurar usuario pelo nome ou email' height={20} />
        </div>

        <h4 className='warning'>*ao clicar para excluir um usuário, a conta será permanentemente removida e não poderá ser recuperada!</h4>

        <div className='filter'>
          <Select placeholder={filter} options={filters} onOptionSelected={handleFilterSelected} />
        </div>

        {users.length > 1 ?
          <>
            <h1 className='title'>Usuarios</h1>

            <div className='users'>
              {users.map((user) => (
                user.id != (jwtDecode(localStorage.getItem('token') ?? "") as { id: string }).id ?

                  (user.name.toUpperCase().includes(search.toUpperCase()) || user.email.toUpperCase().includes(search.toUpperCase())) &&
                  <UserCard
                    user={user}
                    onAction={() => handleButtonClick(user.id, user.active)}
                    onDelete={(alertTitle, alertMessage) => handleUserDelete(alertTitle, alertMessage)}
                    page={[location.pathname, filter]}
                  />

                  : <></>
              ))}
            </div>
          </>

          :

          <h1 className='title'>
            Sem usuarios

            {
              filter == filters[0] ? " cadastrados!" :
                filter == filters[1] ? " com conta ativa!" :
                  filter == filters[2] ? " com conta inativa!" :
                    filter == filters[3] ? " do tipo administrador!" :
                      filter == filters[4] ? " do tipo leitor!" : ""}
          </h1>
        }

        {isAlertOpen && <Alert title={alertTitle} message={alertMessage} onClose={() => setIsAlertOpen(false)} />}
      </div>

      :

      <LoadingPage />
  )
}

export default UserList