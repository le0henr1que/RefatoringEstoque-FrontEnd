import react from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Header from '../../components/Header';
import MenuHorizontal from '../../components/HorizontalMenu';
import Card from '../../components/CardAdd';
// import Container from '@mui/material/Container';
import { useNavigate, Navigate } from "react-router-dom";
import Typography from '@mui/material/Typography';

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
            <Typography sx={{ fontSize: 20, }} color="text.secondary" gutterBottom>Adicionar Setor</Typography>
            <S.Card>
                <Card />
                <Card />
                <Card />
                <Card />
            </S.Card>
            {/* <MenuHorizontal/> */}
        </S.Container>
    )
}
export default Home