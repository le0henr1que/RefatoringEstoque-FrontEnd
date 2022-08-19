import React from "react";
import { Navigate } from 'react-router-dom'

const VerifyAuthenticToken = ({Component}) => {
    const recoveredToken = localStorage.getItem('token')
    return (
    
        recoveredToken ? <Navigate to="/Dashboard" /> : <Component /> 

        )
    };
    export default VerifyAuthenticToken