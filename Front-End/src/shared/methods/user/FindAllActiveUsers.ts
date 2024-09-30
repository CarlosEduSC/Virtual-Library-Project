import { IUser } from "../../interfaces/IUser";
import api from "../api";

export const findAllActiveUsers = async (onError: (message: string) => void): Promise<IUser[]> => {

    const response = await api.get<IUser[]>("/user/find-all-active")

    try {
        if (response.status != 200) {
            onError("Erro ao buscar os usuarios com contas ativas: " + response.statusText)
        }

    } catch (error) {
        onError("Erro ao tentar buscar os usuarios com contas ativas: " + error)
    }

    return response.data
}