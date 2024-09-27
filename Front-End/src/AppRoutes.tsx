import { BrowserRouter, Route, Routes } from "react-router-dom"
import BasePage from "./pages/BasePage"
import Login from "./pages/Login"
import Home from "./pages/Home"
import ProtectedRoute from "./ProtectedRoute"
// import { useEffect, useState } from "react"
// import getUserTypeFromToken from "./shared/methods/user/GetUserTypeFromToken"

const AppRoutes = () => {
    // const [type, setType] = useState("")

    // useEffect(() => {
    //     const token = localStorage.getItem('token');

    //     if (token) {
    //         const usertype = getUserTypeFromToken(token);
    //         setType(usertype);
    //     }
    // }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<BasePage />}>
                    <Route path="/login" element={<Login />} />

                    <Route path="/" element={<ProtectedRoute element={<Home />} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes