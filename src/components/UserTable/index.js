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
import { Backdrop, Button, Fade, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import FilterListOffOutlinedIcon from '@mui/icons-material/FilterListOffOutlined';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170,  align: 'left',},
  { id: 'email', label: 'Email', minWidth: 100,  align: 'left',},
  // {
  //   id: 'Permição',
  //   label: 'Permição',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toLocaleString('en-US'),
  // },
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
  const [open, setOpen] = React.useState(false);
  const [dataUser, setDataUser] = useState([])
  // const handleOpen = () => {setOpen(true);}
  const handleClose = () => setOpen(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  
const [user, setUser] = useState([])

function getUsers(){
    const token = localStorage.getItem('token')
    api.get(`/user`, {
    headers: {
      'Authorization': `token ${token}`
    }})
    .then((response) =>{
    //  alert('Usuarios recuperados')
    //  console.log(response.data)
     setUser(response.data)
     
    })
    .catch((error) => {console.log(error);})
  }
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
             Editar
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2}}>
              <TextField id="outlined-basic" label="Nome" sx={{width:'100%'}} variant="outlined" value={dataUser.name} />
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <TextField id="outlined-basic" label="Email" sx={{width:'100%'}} variant="outlined" value={dataUser.email} />
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {/* <TextField id="outlined-basic" label="Area" sx={{width:'100%'}} variant="outlined" value={dataUser.area} /> */}
                <TextField
                id="outlined-select-currency"
                select
                label="Select"
                sx={{width:'100%'}} 
                value={dataUser.area}
                // onChange={handleChange}
                // helperText="Please select your currency"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value} sx={{width:'100%'}} >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2}}>
              <Button variant="outlined" sx={{ marginRight: 2 }} onClick={() => alert('olá')}>Atualizar</Button>
              <Button variant="contained" onClick={handleClose}>Cancelar</Button>
            </Typography>
          </Box>
        </Fade>
      </Modal>

   
      <Typography id="transition-modal-description" sx={{ mt: 2, marginRight:'16px'}}>
        <Button variant="outlined" sx={{float:'right'}} onClick={() => setOpen(true)}>Adicionar Usuário</Button>
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