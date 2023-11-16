import ReactDOM from "react-dom/client"
import React, {Suspense} from "react"
import App from "./components/App";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LazyAbout} from "@/components/About/LazyAbout";
import {LazyShop} from "./components/Shop/LazyShop";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: '/about',
                element: <Suspense fallback={<div>Loading...</div>}><LazyAbout/></Suspense>
            },
            {
                path: '/shop',
                element: <Suspense fallback={<div>Loading...</div>}><LazyShop/></Suspense>
            }
        ]
    },
]);

const root = document.getElementById("root")
const container = ReactDOM.createRoot(root!)


container.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)