import React, {useState} from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Header from '../../components/Header';
import MenuHorizontal from '../../components/HorizontalMenu';
// import Card from '../../components/CardAdd';
// import Container from '@mui/material/Container';
import { useNavigate, Navigate } from "react-router-dom";

import { getTableFooterUtilityClass, Grid, ListItem, ScopedCssBaseline, TextField } from '@mui/material';
import { Box, Container } from '@mui/system';
import UserTable from '../../components/UserTable'

function Home(){
    const navigate = useNavigate()
  
    // const dados = [
    //     "2022-02-02",
    //     "2021-02-02",
    //     "2022-02-04",
    //     "2023-02-02",
    //     "2024-02-03"
    // ]
    // const [busca, setBusca] = useState('')

    // const frutasFilter = dados.filter((dado) => dado.startsWith(busca))

    return(
        <React.Fragment>
        <ScopedCssBaseline  sx={{ bgcolor: '#000'}}/>
            
            <Container  sx={{ bgcolor: '#F7FAFF'}}>
                <MenuHorizontal/>
                <Box sx={{ bgcolor: '#000', height: '10vh', width: "100%", position:'fixed', left:"80px", marginBottom:'100px'}}>
                    <Header />
                </Box>
            </Container>
            
            <Box sx={{ width: "94%", float:'right', marginTop:'75'}}>
                <Box sx={{ width: "94%", float:'right', height:'75px'}}>
                </Box>
                <Box sx={{ width: "94%", float:'right', height:'75px'}}>
                    {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
                </Box>
                <UserTable />
            </Box>
        </React.Fragment>
      
    )
}
export default Home