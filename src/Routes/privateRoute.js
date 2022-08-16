import React from "react";
import { Navigate } from 'react-router-dom'
import {useAuth} from '../providers/auth'

const PrivateRoute = ({Component}) => {
    const recoveredToken = localStorage.getItem('token')
    return (
    
        !recoveredToken ? <Navigate to="/" /> : <Component /> 

        )
    };
    export default PrivateRoute