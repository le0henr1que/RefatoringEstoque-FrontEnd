import { Avatar, Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AvatarName from '../Avatar'
import * as S from './style'
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import PermDataSettingOutlinedIcon from '@mui/icons-material/PermDataSettingOutlined';


export default function MenuHorizontal(viewTable) { 
    const [name, setName] = useState('Sem Nome')
    const [area, setArea] = useState()
    useEffect(() => {
        const userName = localStorage.getItem('user')
        setName(JSON.parse(userName).name)
        setArea(JSON.parse(userName).area)
      }, [])
    return (
        <Box sx={{ bgcolor: '#081736', height: '100vh', width: "75px", position:'fixed', left:'0', borderRight:'5px solid #6B97FF', display: 'flex', justifyContent:'space-evenly', flexDirection:'column', alignItems:'center', textTransform:'uppercase', fontSize:'12px', color:'#FFF', fontFamily:'sans-serif'}} >
      
            <Box  sx={{ height: '50%', display: 'flex', justifyContent:'start', flexDirection:'column', alignItems:'center', marginTop:'10px'}}>
                <AvatarName onlyAvater={"Horizontal"} userName={`${name}`} />
            </Box>
            <Box  sx={{ height: '50%', display: 'flex', justifyContent:'space-evenly', flexDirection:'column', alignItems:'center'}}>

            {  
            area == 'Administrador' &&
            <Box  sx={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
                <Button variant="outlined" onClickv={viewTable} sx={{color:'#FFF', marginBottom:'5px'}}><PersonSearchOutlinedIcon/></Button>
                User
            </Box>
            
            }
            <Box  sx={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
                <Button variant="outlined" sx={{color:'#FFF', marginBottom:'5px'}}><Inventory2OutlinedIcon/></Button>
                Estoque
            </Box>
            <Box  sx={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
                <Button variant="outlined" sx={{color:'#FFF', marginBottom:'5px'}}><AnnouncementOutlinedIcon/></Button>
                Mensagem
            </Box>
            <Box  sx={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
                <Button variant="outlined" sx={{color:'#FFF', marginBottom:'5px'}}><PermDataSettingOutlinedIcon/></Button>
                Config...
            </Box>
            </Box>
        </Box>
    )
    
}