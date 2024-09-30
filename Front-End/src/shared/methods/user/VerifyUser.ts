import api from "../api"

export const verifyUser = async (onError: (title: string, message: string) => void): Promise<boolean> => {

  try {
    const response = await api.get("/user/verify-user")

    if (response.status == 204) {
      return true

    } else {
      onError(response.data.title, response.data.message)
      return false
    }

  } catch (error: any) {
    if (error.response && error.response.data) {
      onError(error.reponse.data.title, error.response.data.message)

    } else {
      onError(error.title, error.message)
    }

    return false
  }
}