import React, {useState, useEffect} from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Header from '../../components/Header';
import { Avatar, Button } from '@mui/material'
import AvatarName from '../../components/Avatar'
import { useNavigate, Navigate } from "react-router-dom";
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import PermDataSettingOutlinedIcon from '@mui/icons-material/PermDataSettingOutlined';
import { getTableFooterUtilityClass, Grid, ListItem, ScopedCssBaseline, TextField } from '@mui/material';
import { Box, Container } from '@mui/system';
import UserTable from '../../components/UserTable'
import InventoryTable from '../../components/InventoryTable'

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

    const [area, setArea] = useState()
    const [name, setName] = useState('Sem Nome')
    const [table, setTable] = useState('Inventory')

    useEffect(() => {
        const userName = localStorage.getItem('user')
        setName(JSON.parse(userName).name)
        setArea(JSON.parse(userName).area)
      
      }, [])
    return(
        <React.Fragment>
        <ScopedCssBaseline  sx={{ bgcolor: '#000'}}/>
            
            <Container  sx={{ bgcolor: '#F7FAFF'}}>

             <Box sx={{ bgcolor: '#081736', height: '100vh', width: "75px", position:'fixed', left:'0', borderRight:'5px solid #6B97FF', display: 'flex', justifyContent:'space-evenly', flexDirection:'column', alignItems:'center', textTransform:'uppercase', fontSize:'12px', color:'#FFF', fontFamily:'sans-serif'}} >
                <Box  sx={{ height: '50%', display: 'flex', justifyContent:'start', flexDirection:'column', alignItems:'center', marginTop:'10px'}}>
                    <AvatarName onlyAvater={"Horizontal"} userName={`${name}`} />
                </Box>
                <Box  sx={{ height: '50%', display: 'flex', justifyContent:'space-evenly', flexDirection:'column', alignItems:'center'}}>

            {
                area == 'Administrador' &&
                <Box  sx={{display: 'flex', flexDirection:'column', alignItems:'center'}} >
                    <Button variant="outlined" sx={{color:'#FFF', marginBottom:'5px'}} onClick={() => setTable('adm')}><PersonSearchOutlinedIcon/></Button>
                    User
                </Box>
            }
                
                <Box  sx={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
                    <Button variant="outlined" sx={{color:'#FFF', marginBottom:'5px'}} onClick={() => setTable('Inventory')}><Inventory2OutlinedIcon/></Button>
                    Estoque
                </Box>
                <Box  sx={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
                    <Button variant="outlined" sx={{color:'#FFF', marginBottom:'5px'}} onClick={() => setTable('MSG')}><AnnouncementOutlinedIcon/></Button>
                    Mensagem
                </Box>
                <Box  sx={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
                    <Button variant="outlined" sx={{color:'#FFF', marginBottom:'5px'}} onClick={() => setTable('CONFIG')}><PermDataSettingOutlinedIcon/></Button>
                    Config...
                </Box>
                </Box>
            </Box>

                <Box sx={{ bgcolor: '#000', height: '10vh', width: "100%", position:'fixed', left:"80px", marginBottom:'100px'}}>
                    <Header />
                </Box>
            </Container>

            {
            area == 'Administrador' &&

            <Box sx={{ width: "94%", float:'right', marginTop:'75'}}>
                <Box sx={{ width: "94%", float:'right', height:'75px'}}></Box>
                <Box sx={{ width: "94%", float:'right', height:'75px'}}></Box>
                { table == "adm" &&  <UserTable />} 
                { table == "Inventory" &&  <InventoryTable />} 
                { table == "MSG" &&  <UserTable />} 
                { table == "CONFIG" &&  <UserTable />} 

            </Box>}

        </React.Fragment>
      
    )
}
export default Home