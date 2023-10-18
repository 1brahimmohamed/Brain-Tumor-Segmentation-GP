import {CssBaseline} from "@mui/material";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import AppRouter from "./routes.jsx";

import './App.css'

function App() {
    return (
        <div className="app">
            <main className="content">
                <RouterProvider router={AppRouter} />
            </main>
        </div>
    )
}

export default App
