import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Main from "./pages/Main"
import { getItem } from "./storage";

export default function MainRoutes() {
    function ProtectedRoutes({ redirectTo }) {
        const isAuthenticated = getItem('token');
        return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
    }

    return (
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/cadastro" element={<SignIn />} />

            <Route element={
                <ProtectedRoutes redirectTo='/' />
            }>
                <Route exact path="/home" element={<Main />} />
            </Route>
        </Routes>

    )
}