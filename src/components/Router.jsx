import {React} from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedSection from './ProtectedSection.jsx'
import {DataProvider} from './DataContext.jsx'

import LandingPage from '../pages/LandingPage'
import App from '../pages/App.jsx'
import Login from '../pages/login.jsx'
import Signup from '../pages/signup.jsx'
import FinalStory from '../pages/FinalStory.jsx'

const Router = createBrowserRouter([
    {
        path:"/",
        element: <LandingPage />,
    },
    {
        path:"/landing",
        element: <LandingPage />,
    },
    {
        path:"/login",
        element: <Login />,
    },
    {
        path:"/signup",
        element: <Signup />,
    },
    {
        path:"/app",
        element: <ProtectedSection><App /></ProtectedSection>,
    },
    {
        path:"/final-story",
        element: <FinalStory />
    }
])

export default Router