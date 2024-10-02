import { useEffect, useState } from 'react'
import './index.css'
import { IUser } from '../../shared/interfaces/IUser'
import { findAllUsers } from '../../shared/methods/user/FindAllUsers'
import UserCard from '../../components/UserCard'
import Alert from '../../components/Alert'


const UserList = () => {
  const [users, setUsers] = useState<IUser[]>([])

  const [fetchAll, setFetchAll] = useState(true)

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertTitle, setAlertTitle] = useState("")
  const [alertMessage, setAlertMessage] = useState("")

  useEffect(() => {
    const fetchUsers = async () => {
      const success = await findAllUsers(
        setUsers,
        (errorTittle, errorMessage) => {
          setAlertTitle(errorTittle)
          setAlertMessage(errorMessage)
        }
      )

      if (!success) {
        setIsAlertOpen(true)
      }
    }

    if (fetchAll) {
      fetchUsers()
    }
  }, [fetchAll, users])

  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard user={user}/>
      ))}

      {isAlertOpen && <Alert title={alertTitle} message={alertMessage} onClose={() => setIsAlertOpen(false)} />}
    </div>
  )
}

export default UserList