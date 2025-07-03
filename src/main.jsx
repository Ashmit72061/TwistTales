import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom"; 
import './styles/index.css'
// import App from './App.jsx'
import Router from './components/Router.jsx'
import { AuthProvider } from './components/AuthContext.jsx'
import { DataProvider } from './components/DataContext.jsx';

import CustomCursor from './components/customCursor.jsx';

createRoot(document.getElementById('root')).render(
    // <div className='cursor-none'>
    <AuthProvider>
        <DataProvider>
            {/* <CustomCursor /> */}
            <RouterProvider router={Router} />
        </DataProvider>
    </AuthProvider>
    // </div>

)
