import { createBrowserRouter } from "react-router-dom";

// layouts
import ViewerLayout from "./layouts/ViewerLayout";
import LoginLayout from "./layouts/LoginLayout";
import HomeLayout from "./layouts/HomeLayout";

// pages
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/Home";
import NotFound404 from "./pages/404/404";
import RegularViewer from "./pages/Viewer/RegularViewer.jsx";


const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout/>,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/home",
                element: <Home/>,
            }
        ],
    },
    {
        path: "/viewer",
        element: <ViewerLayout/>,
        children: [
            {
                index: true,
                element: <RegularViewer />,
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
    {
        path: "*",
        element: <NotFound404/>,
    }
]);

export default AppRouter;
