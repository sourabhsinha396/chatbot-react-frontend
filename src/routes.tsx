import { createBrowserRouter } from "react-router-dom";
import TextCompletion from "./components/completions/TextCompletion";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";


const router = createBrowserRouter([
    {
        path: '/',
        element: <TextCompletion />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/login',
        element: <Login />,
    },
])

export default router
