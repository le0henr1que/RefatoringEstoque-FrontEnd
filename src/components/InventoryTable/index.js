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
import { Alert, AlertTitle, Backdrop, Button, Fade, Grid, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import FilterListOffOutlinedIcon from '@mui/icons-material/FilterListOffOutlined';
import { useNavigate } from 'react-router';
import { Snackbar } from '@material-ui/core';
import ReactDOM from "react-dom";
import QRCode from "qrcode.react";
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';

import io from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid';


const myId = uuidv4()
const socket = io('http://192.168.15.7:5000')
socket.on('connect', () => console.log('[IO] Connect => A new connection has been established'))


const columns = [
  { id: 'name', label: 'Name', minWidth: 170,  align: 'left',},
  { id: 'description', label: 'Descrição', minWidth: 100,  align: 'left',},

  {
  id: 'amount',
    label: 'Quantidade',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
 
];

function createData(name, edescription, amount) {
  const opcao =  amount;
  return { name, edescription, amount };
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
  width:'70%',
  p: 4,
};



export default function UserTable() {
  const [user, setUser] = useState([])
  const [open, setOpen] = React.useState(false);
  const [dataInventory, setdataInventory] = useState([])
  // const handleOpen = () => {setOpen(true);}
  const handleClose = () => setOpen(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate()
  const [upOrAd, setUpOrAdd] = useState()
  const [notification, setNotification] = useState()

  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [amount, setAmount] = useState()

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
function getInventory(){
    const token = localStorage.getItem('token')
    api.get(`/showInventory`, {
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
  // Lista de select com as amounts
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

    
    var data = {
      "name": name,
      "description": description,
      "amount": parseInt(amount)
    }
  
    if(upOrAd == 'Adicionar'){

    //recuperando e criando payload para criar user 
    

      const token = localStorage.getItem('token')
        api.post(`/inventory`,  data,{
          headers: {
            'Authorization': `Bearer ${token}`
          }})
        .then((response) =>{
          getInventory()
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
    }else{
  

      const token = localStorage.getItem('token')
      api.put(`/updateInventory/${dataInventory._id}`,  data,{
        headers: {
          'Authorization': `Bearer ${token}`
        }})
      .then((response) =>{
        getInventory()
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
  const downloadQRCode = () => {
    // Generate download with use canvas and stream
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `qrc.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  React.useEffect(() => {
     getInventory()
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
        <Fade in={open} >
          <Box sx={style}>
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid  xs={5} md={5}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
              {upOrAd} 
              </Typography>
              <input  style={{ display: 'none' }} id="upload-photo" name="upload-photo" type="file"/>
              <Paper variant="outlined" sx={{textAlign:'center', border:'none', cursor:'pointer'}} onClick={() => {document.getElementById("upload-photo").click();}}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Item_sem_imagem.svg/320px-Item_sem_imagem.svg.png" />
              </Paper>
            </Grid>
            <Grid  xs={7} md={7}>
              <Typography id="transition-modal-description" sx={{ mt: 2}}>
                <TextField id="outlined-basic" label="Nome" sx={{width:'100%'}} variant="outlined" value={name}  onChange={e => setName(e.target.value)}/>
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <TextField id="outlined-basic" label="Descrição" multiline rows={3} sx={{width:'100%'}} variant="outlined" value={description} onChange={e => setDescription(e.target.value)}/>
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <TextField type="number" id="outlined-basic" label="Quantidade" sx={{width:'100%'}} variant="outlined" value={amount} onChange={e => setAmount(e.target.value)}/>
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2}}>
                <TextField type="number" id="outlined-basic" label="Estoque Máximo" sx={{width:'50%'}} variant="outlined" value={amount} onChange={e => setAmount(e.target.value)}/>
                <TextField type="number" id="outlined-basic" label="Estoque Mínimo" sx={{width:'50%'}} variant="outlined" value={amount} onChange={e => setAmount(e.target.value)}/>
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2}}>
                <Button variant="contained" sx={{float:'right'}} onClick={handleClose}>Cancelar</Button>
                <Button variant="outlined" sx={{ marginRight: 2, float:'right' }} onClick={() =>  updateOrAdd()}>{upOrAd}</Button>
              </Typography>
            </Grid>
          </Grid>
          </Box>
        </Fade>
      </Modal>

      <Snackbar open={openNotification} autoHideDuration={6000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity={notificationType} sx={{ width: '100%' }}>
          {notification}
        </Alert>
      </Snackbar>
   
      <Typography id="transition-modal-description" sx={{ mt: 2, marginRight:'16px'}}>
        <Button variant="outlined" sx={{float:'right'}} onClick={() => {setOpen(true); setUpOrAdd('Adicionar');  setName(''); setDescription(''); setAmount('')}}>Adicionar Produto</Button>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.edescription}>
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
                          setdataInventory(row)
                          setName(row.name)
                          setDescription(row.description)
                          setAmount(row.amount)
                          setUpOrAdd('Editar')
                          console.log(row)
                          }} sx={{cursor:'pointer'}} />
                          
                          <QRCode value={"http://192.168.15.7:5000/?idProd="+row._id}  id="qr-gen" style={{width:'20px', height:'20px', cursor:'pointer', marginLeft:'5px'}} onClick={downloadQRCode}/>

                          
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