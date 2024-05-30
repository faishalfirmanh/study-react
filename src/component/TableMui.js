import * as React from 'react';
import { styled } from '@mui/system';
import {
tablePaginationClasses as classes,
} from '@mui/base/TablePagination';

import { useState, useEffect } from 'react';
import ModalComponent from './ModalComponent';
import { Button } from 'react-bootstrap';

import axios from 'axios'
import { ReqApiStudy, base_url, study_delete, study_get_all } from '../entpoint/RequestApi';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TablePagination, CircularProgress, Box } from '@mui/material';
import ModalCustom from './ModalCustom';

export default function TableMui() {
    const url_ = "https://study.cobaktesbrow.com/api/";


 

  const [page, setPage] = useState(0);
  const [nextPage, setNextPage] = useState(0);
  const [prevPage, setPrevPage] = useState(0);
  const [countData, setCountDate] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataEmp, setEmployee] = useState({})

  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [closeModal, setCloseModal] = useState(true);
  const [currentItem, setCurrentItem] = useState(null);
  const [items, setItems] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [emp, setEmp] = useState(0);

  function isEmpty(obj) {
    return JSON.stringify(obj) === '{}';
  }

  useEffect(()=>{  
     getAllEmployee()
 },[page,rowsPerPage])


   const cekPrev = (page)=>{
      if(page !== null){
         const convert = page.split("=");
         setPrevPage(convert[1])
      }else{
        setPrevPage(null)
      }
   }

   const cekNext = (page)=>{
    if(page !== null){
       const convert = page.split("=");
       setNextPage(convert[1])
    }else{
       setNextPage(null)
    }
 }

 
  const getAllEmployee = ()=>{
   

    
     const urlGet = `${base_url}${study_get_all}`
     const param = {
        page : page+1,
        limit :rowsPerPage
     }
      ReqApiStudy(urlGet, param)
      .then(function (response) {
        const respons_current_page = response.data.data.current_page
        console.log("--after req | next page- ",response.data.data.next_page_url)
        console.log("-cur page-",respons_current_page)
        cekPrev(response.data.data.prev_page_url)
        cekNext(response.data.data.next_page_url)
        setCountDate(response.data.data.total)
         if (response.data.data.data.length > 0) {
            setEmployee(response.data.data.data)
         }else{
            setEmployee(undefined)
         }
       
      })
      .catch(function (error) {
        
        console.log(error);
      })
      .finally(function(){
        setLoading(false);
      })
      
  }


  //modal awal
  const handleCreateModal = () => {
    setCurrentItem(null);
    setShowModal(true);
    setIsEditMode(false)
  };

  const handleEditModal = (item) => {
    setCurrentItem(item);
    console.log("tabble",item)
    setShowModal(true);
    setIsEditMode(true)
  };

  const submitApi = (item)=>{
    if (isEditMode) {
      setItems(items.map(i => (i.id === item.id ? item : i)));
    } else {
      setItems([...items, { ...item, id: items.length + 1 }]);
    }
    setShowModal(false);
    getAllEmployee(1,rowsPerPage)
    console.log('====================================');
    items.map((ee)=>{
      console.log(ee)
    })
    console.log('====================================');
  }

  //modal akhir
 
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    console.log("new page",page, "| ",newPage);
    
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleted = (idnya) => {
    const urlGet = `${base_url}${study_delete}`
    const param = {
       id : idnya,
    }
     ReqApiStudy(urlGet, param)
     .then(function (response) {
       if (response.status == 200) {
        getAllEmployee(1,rowsPerPage)
       }
     })
     .catch(function (error) {
       alert("gagal hapuss")
     });
  };

 
  const tampilData = ()=>{
    if(!isEmpty(dataEmp)){
      return(
       dataEmp.map((row) => (
         <TableRow key={row.id}>
           <TableCell>{row.id}</TableCell>
           <TableCell>{row.name}</TableCell>
           <TableCell>{row.email}</TableCell>
           <TableCell>
             <button onClick={() =>handleEditModal(row.id)}>Edit</button>
             <button style={{marginLeft:20}} onClick={() => handleDeleted(row.id)}>Deleted</button>
                      </TableCell>
         </TableRow>
       ))
      )
    }
 }


  return (
    <Root sx={{ maxWidth: '100%', width: 800, marginLeft:"auto",marginRight:"auto",marginTop:40}}>
     {/* <ModalForm 
     handleSave={submitApi(emp)}
     CreateOrUpdateId={emp} 
     btnOpenModal={handleOpenModalProps} 
     btnCloseModal={CloseModalProps} show={showModal}/> */}

    <Button onClick={handleCreateModal}>Create Item</Button>
     <ModalCustom
     show={showModal}
     onHide={() => setShowModal(false)}
     onSave={submitApi}
     item={currentItem}
     isEditMode={isEditMode}
     />
     
     <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Box display="flex" justifyContent="center">
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            ) : 
              tampilData()
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={countData}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, countData]}
      />
    </Paper>
    </Root>
  );
}

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData('Cupcake', 305, 1),
  createData('Donut', 452, 2),
  createData('Eclair', 262, 3),
  createData('Frozen yoghurt', 159, 4),
  createData('Gingerbread', 356, 6),
  createData('Honeycomb', 408, 5),
  createData('Ice cream sandwich', 237, 7),
  createData('Jelly Bean', 375, 8),
  createData('KitKat', 518, 9),
  createData('Lollipop', 392, 10),
  createData('Marshmallow', 318, 11),
  createData('Nougat', 360, 12),
  createData('Oreo', 437, 13),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Root = styled('div')(
  ({ theme }) => `
  table {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  }
  `,
);

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;
