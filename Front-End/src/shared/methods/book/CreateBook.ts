import { IBook } from "../../interfaces/IBook";
import api from "../api";

export const createBook = async (
    book: IBook,
    onAlert: (alertTitle: string, alertMessage: string) => void): Promise<boolean> => {

    try {
        const response = await api.post("/book/create", book)

        onAlert(response.data.title, response.data.message)

        if (response.status == 201) {
            return true

        } else {
            return false
        }

    } catch (error: any) {
        if (error.response && error.response.data) {
            onAlert(error.response.data.title, error.response.data.message)

        } else {
            onAlert(error.title, error.message)
        }

        return false
    }

}