import { IBook } from "../../interfaces/IBook";
import api from "../api";

export const findAllBooks = async (
    setBooks: (books: IBook[]) => void,
    onError: (title: string, message: string
    ) => void): Promise<boolean> => {

    try {
        const reponse = await api.get("/book/find-all")

        if (reponse.status == 200) {
            setBooks(reponse.data)

            return true

        } else {
            onError(reponse.data.title, reponse.data.message)

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