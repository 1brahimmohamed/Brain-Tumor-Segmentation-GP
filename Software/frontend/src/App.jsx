import {RouterProvider} from "react-router-dom";
import AppRouter from "./router.jsx";

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
