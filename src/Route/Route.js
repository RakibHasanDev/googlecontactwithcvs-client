import LoginForm from "../Components/LoginForm";
import Users from "../Components/Users/Users";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginForm></LoginForm>,
        errorElement: <h1>404 Not Found</h1>,
    },
    {
        
        path: '/users',
        element: <Users></Users>
    
    }

])

export default router;