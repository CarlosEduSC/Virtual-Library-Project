import { BrowserRouter, Route, Routes } from "react-router-dom"
import BasePage from "./pages/BasePage"
import BookForm from "./components/BookForm"

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<BasePage />}>
                    <Route path="/" element={<BookForm />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes