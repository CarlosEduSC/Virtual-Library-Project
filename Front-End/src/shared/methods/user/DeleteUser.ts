import api from "../api"

export const deletUser = async (
    id: string,
    onSucess: (message: string) => void,
    onError: (message: string) => void) => {

    try {
        const response = await api.delete("/usuario/deletar/" + id)

        if (response.status == 204) {
            onSucess("Usuario deletado com sucesso!")

        } else {
            onError("Erro ao deletar o usuario: " + response.statusText)
        }

    } catch (error) {
        onError("Erro ao tentar deletar o usuario: " + error)
    }
}