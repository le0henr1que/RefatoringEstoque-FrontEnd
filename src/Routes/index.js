import React from 'react'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {AuthProvider} from "../providers/auth";

import PrivateRoute from "./privateRoute";
import VerifyAuthenticToken from "./verifyAuthenticToken";

import Dashboard from '../views/Home'
import SignIn from '../views/Login'

export default function Rout(){
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
            
                    <Route exact path="/" element={<VerifyAuthenticToken Component={SignIn}/>}/>
         
                    <Route path="/Dashboard" element={<PrivateRoute Component={Dashboard} />}/>
                   
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}