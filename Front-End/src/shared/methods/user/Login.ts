import { IUser } from "../../interfaces/IUser";
import api from "../api";

export const login = async (
    user: IUser,
    onError: (title: string, message: string) => void): Promise<boolean> => {

    try {
        const response = await api.post("/login", user)

        if (response.status == 200) {
            const token = response.data

            localStorage.setItem('token', token)

            return true

        } else {
            onError(response.data.title, response.data.message)

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