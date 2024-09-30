import { IUser } from "../../interfaces/IUser";
import api from "../api";

export const updateUser = async (
    user: IUser,
    onSucess: (message: string) => void,
    onError: (message: string) => void) => {

    try {
        const response = await api.post<IUser>("/user/update", user)

        if (response.status == 200) {
            onSucess("Usuario atualizado com sucesso!")

        } else {
            onError("Erro ao atualizar o usuario: " + response.statusText)
        }

    } catch (error) {
        onError("Erro ao tentar atualizar o usuario: " + error)
    }
}