import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";import './styles/index.css'
// import App from './App.jsx'
import Router from './components/Router.jsx'

createRoot(document.getElementById('root')).render(
    <RouterProvider router={Router} />
)
