import { IUser } from "../../interfaces/IUser";
import api from "../api";

export const updateUser = async (
    user: IUser,
    onAlert: (title: string, message: string) => void): Promise<boolean> => {

    try {
        const response = await api.put("/user/update", user)

        onAlert(response.data.title, response.data.message)

        if (response.status == 200) {
            return true

        } else {
            return false
        }

    } catch (error: any) {
        if (error.response && error.response.data) {
            onAlert(error.reponse.data.title, error.response.data.message)

        } else {
            onAlert(error.title, error.message)
        }

        return false
    }
}