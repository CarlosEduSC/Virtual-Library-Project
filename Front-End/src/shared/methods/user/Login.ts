import { IUser } from "../../interfaces/IUser";
import api from "../api";

export const login = async (
    user: IUser,
    onError: (tittle: string, message: string) => void) => {

    try {
        const response = await api.post("/login", user);

        if (response.status == 200) {
            const token = response.data.tokenJWT

            localStorage.setItem('token', token)



            return token

        } else {
            onError("", "Usuario ou senha invalidos!")
        }

    } catch (error) {
        onError("Erro ao tentar fazer login!", String(error))
    }
}