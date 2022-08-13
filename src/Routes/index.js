import React from 'react'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {AuthProvider} from "../providers/auth";

import PrivateRoute from "./privateRoute";

import Home from '../views/Home'
import SignIn from '../views/Login'

export default function Rout(){
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route exact path="/" element={<SignIn/>}/>
                    <Route path="/Home" element={<PrivateRoute Component={Home} />}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}