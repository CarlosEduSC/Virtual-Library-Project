import api from "../api"

export const verifyUser = async (onError: (tittle: string, message: string) => void): Promise<boolean> => {

    const tittle = "Erro ao verificar autenticação!"

    const response = await api.get<boolean>("/usuario/verify-user")

    try {
        if (response.status == 204) {
            return true

        } else {
            onError(tittle, String(response.status + ": " + response.data));
            return false
        }

    } catch (error) {
        onError(tittle, String(error));
        return false
    }
}