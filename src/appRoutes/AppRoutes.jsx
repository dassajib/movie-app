import { lazy, Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import AppLayout from "../layout/AppLayout"

const Login = lazy(() => import("../pages/Login"))
const Signup = lazy(() => import("../pages/Signup"))
const MovieDetails = lazy(() => import("../pages/MovieDetails"))
const WatchList = lazy(() => import("../pages/WatchList"))
const HomePage = lazy(() => import("../pages/HomePage"))

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth()
    return user ? children : <Navigate to="/login" replace />
}

const AppRoutes = () => {
    return (
        <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Navigate to="/movies" />} />

                <Route path="/" element={<AppLayout />}>
                    <Route path="movies" element={<HomePage />} />
                    <Route path="movie/:id" element={<MovieDetails />} />
                    <Route
                        path="watchlist"
                        element={
                            <ProtectedRoute>
                                <WatchList />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </Suspense>
    )
}

export default AppRoutes
