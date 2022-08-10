import react from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Home(){
    return(
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="success">Usuário Logado com Sucesso!</Alert>
        </Stack>
    )
}
export default Home