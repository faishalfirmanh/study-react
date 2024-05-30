import * as React from 'react';
import { styled } from '@mui/system';
import {
tablePaginationClasses as classes,
} from '@mui/base/TablePagination';

import { useState, useEffect } from 'react';

import { Button } from 'react-bootstrap';


import { ReqApiStudy, base_url, study_delete, study_get_all } from '../entpoint/RequestApi';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TablePagination, CircularProgress, Box } from '@mui/material';

import UserModalForm from './UserModalForm';
import ButtonCustom from './ButtonCustom';


export default function TableMui() {

  const [page, setPage] = useState(0);
  const [nextPage, setNextPage] = useState(0);
  const [prevPage, setPrevPage] = useState(0);
  const [countData, setCountDate] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataEmp, setEmployee] = useState({})

  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
 

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



  const refreshData = () => {
    getAllEmployee()
  };

  const handleModalShow = (userId = null) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };


  const handleModalClose = () => {
    setShowModal(false);
    setSelectedUserId(null);
  };

 
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
              <ButtonCustom label="edit" onClick={() =>handleModalShow(row.id)} variant="primary" size="sm" />
             {/* <button onClick={() =>handleModalShow(row.id)}>Edit</button> */}
             <ButtonCustom label="delete" onClick={() =>handleDeleted(row.id)} variant="danger" size="sm" />
           </TableCell>
         </TableRow>
       ))
      )
    }
 }


  return (
    <Root sx={{ maxWidth: '100%', width: 800, marginLeft:"auto",marginRight:"auto",marginTop:10}}>
   

    {/* <Button onClick={() => handleModalShow()}>Create User</Button> */}
    <ButtonCustom label="create" onClick={()=>handleModalShow()} variant="primary" size="sm" />
    <UserModalForm
        show={showModal}
        handleClose={handleModalClose}
        userId={selectedUserId}
        refreshData={refreshData}
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


