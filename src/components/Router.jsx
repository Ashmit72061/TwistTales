import {React} from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import App from '../pages/App.jsx'

const Router = createBrowserRouter([
    {
        path:"/landing",
        element: <LandingPage />,
    },
    {
        path:"/login",
        element: "",
    },
    {
        path:"/app",
        element: <App />,
    }
])

export default Router