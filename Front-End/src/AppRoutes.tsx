import { BrowserRouter, Route, Routes } from "react-router-dom"
import BasePage from "./pages/BasePage"
import Home from "./pages/Home"
import ProtectedRoute from "./ProtectedRoute"
import Login from "./pages/Login"
import CreateUser from "./pages/CreateUser"
import UpdateUser from "./pages/UpdateUser"
import UserList from "./pages/UserList"
import CreateBook from "./pages/CreateBook"
import BookList from "./pages/BookList"
import UpdateBook from "./pages/UpdateBook"

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<BasePage />}>
                    <Route path="/login" element={<Login />} />

                    <Route path="/" element={<ProtectedRoute element={<Home />} />} />

                    <Route path="/createUser" element={<ProtectedRoute element={<CreateUser />} requiredUserType="ADMIN" />} />
                    <Route path="/updateUser/:userId" element={<ProtectedRoute element={<UpdateUser />} requiredUserType="ADMIN" />} />
                    <Route path="/listUsers" element={<ProtectedRoute element={<UserList />} requiredUserType="ADMIN" />} />

                    <Route path="/createBook" element={<ProtectedRoute element={<CreateBook />} requiredUserType="ADMIN" />} />
                    <Route path="/updateBook/:bookId" element={<ProtectedRoute element={<UpdateBook />} requiredUserType="ADMIN" />} />
                    <Route path="/listBooks" element={<ProtectedRoute element={<BookList />} requiredUserType="ADMIN" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes