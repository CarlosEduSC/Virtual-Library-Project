import { BrowserRouter, Route, Routes } from "react-router-dom"
import BasePage from "./pages/BasePage"
import Login from "./pages/Login/Login"
import Home from "./pages/Home"

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<BasePage />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes