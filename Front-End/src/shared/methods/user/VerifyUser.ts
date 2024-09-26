import api from "../api"

export const verifyUser = async (): Promise<boolean> => {

    const response = await api.get<boolean>("/usuario/verify-user")

    return response.data
}