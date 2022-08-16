import React, {useEffect, useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export const AuthContext = React.createContext({});



export const AuthProvider = (props) => {
    const [token, setToken] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)
    const navigate = useNavigate()
   
    
    return(
        <AuthContext.Provider value={{token, setToken, authenticated, setAuthenticated}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => React.useContext(AuthContext)