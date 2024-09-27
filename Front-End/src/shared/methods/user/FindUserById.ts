import { IUser } from "../../interfaces/IUser";
import api from "../api";

export const findUserById = async (
    id: string,
    onError: (message: string) => void): Promise<IUser> => {

    const response = await api.get<IUser>("/usuario/buscar/" + id)

    try {
        if (response.status != 200) {
            onError("Erro ao buscar usuario: " + response.statusText)
        }

    } catch (error) {
        onError("Erro ao tentar buscar usuario: " + error)
    }

    return response.data
}