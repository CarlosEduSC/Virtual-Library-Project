import { IUser } from "../../interfaces/IUser";
import api from "../api";

export const findAllUsers = async (onError: (message: string) => void): Promise<IUser[]> => {

    const reponse = await api.get<IUser[]>("/usuario/buscar-todos");

    try {
        if (reponse.status != 200) {
            onError("Erro ao buscar todos os usuarios: " + reponse.statusText)

        }

    } catch (error) {
        onError("Erro ao tentar buscar todos os usuarios: " + error)
    }

    return reponse.data
}