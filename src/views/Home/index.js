import react from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Header from '../../components/Header';
// import Container from '@mui/material/Container';
import { useNavigate, Navigate } from "react-router-dom";

import * as S from './styles'



function Home(){
    const navigate = useNavigate()
   function logOut(){
        localStorage.removeItem('token')
        navigate('/')
    }
    return(
        <S.Container maxWidth="" sx={{ width: 1}} >
            <Header logOut={logOut}/>
           
        </S.Container>
    )
}
export default Home