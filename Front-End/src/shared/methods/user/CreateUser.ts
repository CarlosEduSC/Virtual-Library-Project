import { IUser } from "../../interfaces/IUser";
import api from "../api";

export const createUser = async (
    user: IUser,
    onSucess: (message: string) => void,
    onError: (message: string) => void) => {

    try {
        const response = await api.post<IUser>("/user/create", user)

        if (response.status == 201) {
            onSucess("Usuario cadastrado com sucesso!")

        } else {
            onError("Erro ao cadastrar o usuario: " + response.statusText)
        }

    } catch (error) {
        onError("Erro ao tentar cadastrar o usuario: " + error)
    }
}