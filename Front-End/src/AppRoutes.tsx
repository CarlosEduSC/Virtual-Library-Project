import { BrowserRouter, Route, Routes } from "react-router-dom"
import BasePage from "./pages/BasePage"
import Home from "./pages/Home"
import ProtectedRoute from "./ProtectedRoute"
import { useEffect, useState } from "react"
import getUserTypeFromToken from "./shared/methods/user/GetUserTypeFromToken"
import Login from "./pages/Login"
import CreateUser from "./pages/CreateUser"
import UpdateUser from "./pages/UpdateUser"
import UserList from "./pages/UserList"

const AppRoutes = () => {
    const [type, setType] = useState("")

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const usertype = getUserTypeFromToken(token);
            setType(usertype);
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<BasePage />}>
                    <Route path="/login" element={<Login />} />

                    <Route path="/" element={<ProtectedRoute element={<Home />} />} />
                </Route>

                {type == "ADMIN" &&
                    <Route element={<BasePage />}>
                        <Route path="/createUser" element={<ProtectedRoute element={<CreateUser />} />} />
                        <Route path="/updateUser" element={<ProtectedRoute element={<UpdateUser />} />} />
                        <Route path="/listUsers" element={<ProtectedRoute element={<UserList />} />} />
                    </Route>
                }
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes