import { createBrowserRouter } from "react-router-dom";
import ViewerLayout from "./layouts/ViewerLayout";
import LoginLayout from "./layouts/LoginLayout";
import HomeLayout from "./layouts/HomeLayout";
import Login from "./pages/Auth/Login.jsx";


const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout/>,
    },
    {
        path: "/viewer",
        element: <ViewerLayout/>,
        children: [
            {
                index: true,
                element: <div>HIMA</div>,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginLayout/>,
        children: [
            {
                index: true,
                element: <Login/>,
            }
        ],
    },
]);

export default AppRouter;
