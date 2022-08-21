import { Badge, Box, Grid, IconButton } from '@mui/material';
import React, {useEffect, useState} from 'react';
import AvatarName from '../Avatar'
import MailIcon from '@mui/icons-material/Mail';


export default function Header() {

  // const name ='Leo'
  const [name, setName] = useState('Sem Nome')
 
 
  useEffect(() => {
    const userName = localStorage.getItem('user')
    setName(JSON.parse(userName).name)
  }, [])
  return (
    <Box sx={{bgcolor: '#Fff', height: '10vh', width: "100%", position:'fixed', borderBottom: '1px solid #E1EDFF', left:"80px", borderRadius:'10px 0px 0px 0px'}}>
      <Grid container spacing={{spacing:"2", margin:'10px'}}>
          <Grid item xs={8}>
         
          </Grid>
          <Grid item xs={4} >
            <Grid container spacing={{spacing:"2", margin:'10px'}}>
              <Grid item xs={2}>
                <Badge badgeContent={4} color="primary" xs={{right:'0'}}>
                    <MailIcon color="action" />
                </Badge>
              </Grid>
              <Grid item xs={10}>
                <Box >
                  <AvatarName userName={`${name}`}/>
                </Box>
              </Grid>
            </Grid>
          </Grid>
      </Grid>
  </Box>
  );
}