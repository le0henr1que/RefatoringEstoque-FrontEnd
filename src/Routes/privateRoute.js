import React from "react";
import { Navigate } from 'react-router-dom'
import {useAuth} from '../providers/auth'

const PrivateRoute = ({Component}) => {
    const {token} = useAuth()
    return (
    
            token == false ? <Navigate to="/" /> : <Component /> 

        )
    };
    export default PrivateRoute