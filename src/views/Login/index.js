import React, {useState, useEffect, useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Navigate } from "react-router-dom";
import {useAuth} from '../../providers/auth'
import api from '../../services/api'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress, ScopedCssBaseline } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
    // destrutured
    const {token, setToken} = useAuth()
    // const user = useAuth
    const [open, setOpen] = React.useState(false);
    const [mail, setMail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    
    const onSubmit = async (event) => {
      event.preventDefault();
      
      setLoading(true)
      await api.post(`/login`, {   "email":`${mail}`,  "password":`${password}`})
      .then((response) =>{
        
        localStorage.setItem('token',response.data.token) 
        localStorage.setItem('user', JSON.stringify(response.data.user)) 
        setToken(response.data.token)
        setLoading(false)
        navigate('/Dashboard')

      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
        setOpen(true);
      })

    };

    useEffect(() => {
      const recoveredToken = localStorage.getItem('token')

      if(recoveredToken){
        setToken(recoveredToken)
      }



      // if(!localStorage.getItem('token')){
      //   navigate('/')
      // }else{
      //   navigate('/Dashboard')
      // }

    }, [])
  
  return (
    <React.Fragment>
      <ScopedCssBaseline  sx={{ bgcolor: '#000'}}/>
          <Container  >
            <Box sx={{ bgcolor: '#081736', height: '100%', width: "50%", position:'fixed', left:'0', borderRight:'5px solid #6B97FF', display: 'flex', justifyContent:'space-evenly', flexDirection:'column', alignItems:'center', textTransform:'uppercase', fontSize:'12px', color:'#FFF', fontFamily:'sans-serif'}} >
           
            </Box>
            <Box sx={{ bgcolor: '#FFF', height: '100%', width: "50%", position:'fixed', right:'0', borderRight:'5px solid #6B97FF', display: 'flex', justifyContent:'space-evenly', flexDirection:'column', alignItems:'center', textTransform:'uppercase', fontSize:'12px', color:'#FFF', fontFamily:'sans-serif'}} >
              <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <Box
                    sx={{
                      marginTop: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                   
                    <Typography component="h1" variant="h5">
                      Sign in 
                    </Typography>
                    <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={e => setMail(e.target.value)}
                        value={mail}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                      />
                    
                      <Collapse in={open}>
                      <Alert
                        severity="error"
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                              setOpen(false);
                            }}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                        sx={{ mb: 2 }}
                      >
                        Usuário ou Senha Inválidos!!
                      </Alert>
                    </Collapse>
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        {loading == false ? 'Logar' : <CircularProgress  color="inherit" /> }

                      </Button>
                      <Grid container>
                        <Grid item xs>
                          <Link href="#" variant="body2">
                            Esqueceu a senha?
                          </Link>
                        </Grid>
                       
                      </Grid>
                    </Box>
                  </Box>
                  <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
              </ThemeProvider>
            </Box>
        </Container>
    </React.Fragment>
  );
}