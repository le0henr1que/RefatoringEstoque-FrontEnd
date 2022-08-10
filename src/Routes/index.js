import react from 'react'

import {BrowserRouter, Routes, Route} from 'react-router-dom'


import Home from '../views/Home'
import SignIn from '../views/Login'

export default function Rout(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn/>}/>
                <Route path="/Home" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}