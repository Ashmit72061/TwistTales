import {useAuth} from './AuthContext.jsx'
import { Navigate } from 'react-router-dom';

export default function ProtectedSection({children}){
    const {user} = useAuth();

    if(!user){
        return <Navigate to="/login" replace />;
    }
    else{
        return children
    }
}