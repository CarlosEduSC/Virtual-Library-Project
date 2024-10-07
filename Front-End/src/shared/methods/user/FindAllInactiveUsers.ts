import { IUser } from "../../interfaces/IUser";
import api from "../api";

export const findAllInactiveUsers = async (
    setUsers: (users: IUser[]) => void,
    onError: (title: string, message: string
    ) => void): Promise<boolean> => {

    try {
        const reponse = await api.get("/user/find-all-inactive")

        if (reponse.status == 200) {
            setUsers(reponse.data)

            return true

        } else {
            onError(reponse.data.title, reponse.data.message)

            return false
        }

    } catch (error: any) {
        if (error.response && error.response.data) {
            onError(error.reponse.data.title, error.response.data.message)

        } else {
            onError(error.title, error.message)
        }

        return false
    }
}