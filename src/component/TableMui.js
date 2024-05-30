import * as React from 'react';
import { styled } from '@mui/system';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import ButtonCustom from './ButtonCustom';
import { useState, useEffect } from 'react';
import ModalForm from './ModalForm';
import {Modal, Button, TextField, Typography} from '@mui/material';

import axios from 'axios'
import { ReqApiStudy, base_url, study_delete, study_get_all } from '../entpoint/RequestApi';
import { Alert } from '@mui/material';
import ModalComponent from './ModalComponent';
export default function TableMui() {
    const url_ = "https://study.cobaktesbrow.com/api/";


  const [page, setPage] = useState(0);
  const [nextPage, setNextPage] = useState(0);
  const [prevPage, setPrevPage] = useState(0);
  const [countData, setCountDate] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataEmp, setEmployee] = useState({})
  
  const [showModal, setShowModal] = useState(false);
  const [closeModal, setCloseModal] = useState(true);
  const [currentData, setCurrentData] = useState(null);
  const [items, setItems] = useState(0);
  const [emp, setEmp] = useState(0);

  function isEmpty(obj) {
    return JSON.stringify(obj) === '{}';
  }

  useEffect(()=>{  
     getAllEmployee(page,rowsPerPage)
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

 
  const getAllEmployee = (page_param, limit_param)=>{
    console.log("--param page--",page_param)
    
     const urlGet = `${base_url}${study_get_all}`
     const param = {
        page : page_param,
        limit :limit_param
     }
      ReqApiStudy(urlGet, param)
      .then(function (response) {
        const respons_current_page = response.data.data.current_page
        cekPrev(response.data.data.prev_page_url)
        cekNext(response.data.data.next_page_url)
        setCountDate(response.data.data.total)
         if (response.data.data.data.length > 0) {
            setEmployee(response.data.data.data)
         }else{
            setEmployee(undefined)
         }
         console.log("--data ",response.data.data.next_page_url)
      })
      .catch(function (error) {
        
        console.log(error);
      });
  }


  //modal awal
  const handleOpenModalProps = () => {
        setEmp(0);
        setShowModal(true) 

  };

  const CloseModalProps = () =>{setShowModal(false)};

const handleSubmit = (data) => {
    if (currentData) {
        // Edit existing item
        setItems(items.map(item => item === currentData ? data : item));
    } else {
        // Create new item
        setItems([...items, data]);
    }
    
};
  //modal akhir
 
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    // getAllEmployee(nextPage,rowsPerPage)
    // setPage(newPage);
    // console.log('====================================');
    console.log("new page",page);
    // console.log('====================================');
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    let cek_all = parseInt(event.target.value) < 0 ? countData : parseInt(event.target.value);
    getAllEmployee(0,cek_all)
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

  const handleEdit = (id) => {
    setShowModal(true);
    setEmp(id)
    console.log(`Edit row with id: ${id}`);
  };

  const displayData = () =>{
    if (!isEmpty(dataEmp)) {
        return (rowsPerPage > 0 ? dataEmp.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage): dataEmp).map((row) => 
            (
                <tr key={row.id}>
                <td>{row.name}</td>
                <td style={{ width: 260 }} align="right">
                    {row.email}
                </td>
                <td style={{ width: 160 }} align="right">
                    <button onClick={() => handleEdit(row.id)}>Edit</button>
                    <button style={{marginLeft:20}} onClick={() => handleDeleted(row.id)}>Deleted</button>
                </td>
                </tr>
            )
          )
    }
  }

  return (
    <Root sx={{ maxWidth: '100%', width: 800, marginLeft:"auto",marginRight:"auto",marginTop:40}}>
     <ModalForm CreateOrUpdateId={emp} btnOpenModal={handleOpenModalProps} btnCloseModal={CloseModalProps} show={showModal}/>
     
      <table aria-label="custom pagination table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {displayData()}
          {
            emptyRows > 0 && 
            (
                <tr style={{ height: 41 * emptyRows }}>
                <td colSpan={3} aria-hidden />
                </tr>
            )
          }
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, countData, { label: 'All', value: -1 }]}
              colSpan={3}
              count={countData}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  'aria-label': 'rows per page',
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
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
