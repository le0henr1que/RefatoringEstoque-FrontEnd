import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import api from '../../services/api';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Alert, AlertTitle, Backdrop, Button, Fade, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import FilterListOffOutlinedIcon from '@mui/icons-material/FilterListOffOutlined';
import { useNavigate } from 'react-router';
import { Snackbar } from '@material-ui/core';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170,  align: 'left',},
  { id: 'email', label: 'Email', minWidth: 100,  align: 'left',},

  {
    id: 'area',
    label: 'Área',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
 
];

function createData(name, email, area) {
  const opcao =  area;
  return { name, email, area };
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#FFF',
  border: '1px solid #6B97FF',
  boxShadow: 24,
  p: 4,
};



export default function UserTable() {
  const [user, setUser] = useState([])
  const [open, setOpen] = React.useState(false);
  const [dataUser, setDataUser] = useState([])
  // const handleOpen = () => {setOpen(true);}
  const handleClose = () => setOpen(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate()
  const [upOrAd, setUpOrAdd] = useState()
  const [notification, setNotification] = useState()

  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [area, setArea] = useState('')

  const [openNotification, setOpenNotification] = useState(false);
  const [notificationType, setNotificationType] = useState()

  //exibir notificação
  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenNotification(false);
  };
  //realizar o count da paginação
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //Contar as linhas da tabela para realizar a paginação
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  

// Funçao que recupera os usuarios existentes
function getUsers(){
    const token = localStorage.getItem('token')
    api.get(`/user`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }})
    .then((response) =>{
    
     setUser(response.data)
     
    })
    .catch((error) => {
      if(error.response.status == 401){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')
      }
      console.log(error);
    })
  }
  // Lista de select com as areas
  const currencies = [
    {
      value: 'Compras',
      label: 'Compras',
    },
    {
      value: 'Estoque',
      label: 'Estoque',
    },
   
  ];

  // Funcao para adicionar ou editar usuario
  function updateOrAdd(){

  
    if(upOrAd == 'Adicionar'){

    //recuperando e criando payload para criar user 
     var data = {
      "name": name,
      "email": mail,
      "password": upOrAd == 'Editar' ? dataUser.senha :"senhaPadrao",
      "area": area
    }

      const token = localStorage.getItem('token')
        api.post(`/user`,  data,{
          headers: {
            'Authorization': `Bearer ${token}`
          }})
        .then((response) =>{
          setName('')
          setMail('')
          setArea('')
          setNotification(response.data.message)
          setNotificationType('success')
          setOpenNotification(true)
          setOpen(false);  
        })
        .catch((error) => {
          console.log(error); 
          setName('')
          setMail('')
          setArea('')
          setNotification(error.response.data.message)
          setNotificationType('warning')
          setOpenNotification(true)

        })
    }else{
  

      const token = localStorage.getItem('token')
      api.put(`/user/${dataUser._id}`,  data,{
        headers: {
          'Authorization': `Bearer ${token}`
        }})
      .then((response) =>{
        getUsers()
        setName('')
        setMail('')
        setArea('')
        setNotification(response.data.message)
        setNotificationType('success')
        setOpenNotification(true)
        setOpen(false);  
      })
      .catch((error) => {
        console.log(error); 
        setNotification(error.response.data.message)
        setNotificationType('warning')
        setOpenNotification(true)

      })


    }
  }

  React.useEffect(() => {
     getUsers()
  }, [])

  return (
    <Paper sx={{ overflow: 'hidden', width:'100%'}}>
       <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
            {upOrAd} 
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2}}>
              <TextField id="outlined-basic" label="Nome" sx={{width:'100%'}} variant="outlined" value={dataUser.name}  onChange={e => setName(e.target.value)}/>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <TextField id="outlined-basic" label="Email" sx={{width:'100%'}} variant="outlined" value={dataUser.email} onChange={e => setMail(e.target.value)}/>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {/* <TextField id="outlined-basic" label="Area" sx={{width:'100%'}} variant="outlined" value={dataUser.area} /> */}
                <TextField
                id="outlined-select-currency"
                select
                label="Select"
                sx={{width:'100%'}} 
                value={dataUser.area}
                onChange={e => setArea(e.target.value)}
                // onChange={handleChange}
                // helperText="Please select your currency"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value } sx={{width:'100%'}} >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2}}>
              <Button variant="outlined" sx={{ marginRight: 2 }} onClick={() =>  updateOrAdd()}>{upOrAd}</Button>
              <Button variant="contained" onClick={handleClose}>Cancelar</Button>
            </Typography>
          </Box>
        </Fade>
      </Modal>

      <Snackbar open={openNotification} autoHideDuration={6000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity={notificationType} sx={{ width: '100%' }}>
          {notification}
        </Alert>
      </Snackbar>
   
      <Typography id="transition-modal-description" sx={{ mt: 2, marginRight:'16px'}}>
        <Button variant="outlined" sx={{float:'right'}} onClick={() => {setOpen(true); setUpOrAdd('Adicionar')}}>Adicionar Usuario</Button>
        <Button variant="outlined" sx={{float:'right',  marginRight:'5px'}}><FilterListOutlinedIcon/></Button>
        <Button variant="outlined" sx={{float:'right',  marginRight:'5px'}}><FilterListOffOutlinedIcon/></Button>
      </Typography>

      <TableContainer sx={{ maxHeight: 450}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
                <TableCell>
                  Opção
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
          
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.email}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                        
                      );
                     
                    })}
                    {
                      
                      <TableCell>
                        
                        <EditOutlinedIcon onClick={() => { 
          
                          setOpen(true) 
                          setDataUser(row)
                          setUpOrAdd('Editar')
                          console.log(row)
                          }} sx={{cursor:'pointer'}} />
                        
                      </TableCell>
                    }
                  </TableRow>
                );
              })} 
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={user.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}