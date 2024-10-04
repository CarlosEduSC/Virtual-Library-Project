import { IUser } from "../../interfaces/IUser";
import api from "../api";

export const findUserById = async (
    id: string,
    setUser: (user: IUser) => void,
    onAlert: (title: string, message: string) => void): Promise<boolean> => {

        try {
            const response = await api.get("/user/find/" + id)
    
            if (response.status == 200) {
                setUser(response.data)

                return true
    
            } else {
                onAlert(response.data.title, response.data.message)

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