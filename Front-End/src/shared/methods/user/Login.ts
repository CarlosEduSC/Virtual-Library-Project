import { IUser } from "../../interfaces/IUser";
import api from "../api";

export const login = async (
    user: IUser,
    onError: (tittle: string, message: string) => void): Promise<boolean> => {

    const tittle = "Erro ao tentar fazer login!"

    try {
        const response = await api.post("/login", user);

        if (response.status == 200) {
            const token = response.data.tokenJWT

            localStorage.setItem('token', token)

            return true

        } else {
            onError(tittle, response.data)

            return false
        }

    } catch (error) {
        onError(tittle, String(error))

        return false
    }
}