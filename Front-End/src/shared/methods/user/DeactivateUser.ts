import api from "../api"

export const deactivateUser = async (
    id: string,
    onAlert: (title: string, message: string) => void): Promise<boolean> => {

    try {
        const response = await api.delete("/user/deactivate-account/" + id)

        onAlert(response.data.title, response.data.message)

        if (response.status == 200) {
            return true

        } else {
            return false
        }

    } catch (error: any) {
        if (error.response && error.response.data) {
            onAlert(error.reponse.data.title, error.response.data.message)

        } else {
            onAlert(error.title, error.message)
        }

        return false
    }
}