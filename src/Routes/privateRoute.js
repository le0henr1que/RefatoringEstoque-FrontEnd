import React from "react";
import { Navigate } from 'react-router-dom'
import {useAuth} from '../providers/auth'

const PrivateRoute = ({Component}) => {
    const {user} = useAuth()
    return (
    
            user.user == "admin@admin.com" && user.senha == '123admin' ? <Component /> : <Navigate to="/" />

        )
    };
    export default PrivateRoute