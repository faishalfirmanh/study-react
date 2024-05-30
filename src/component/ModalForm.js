
import React, { useState } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { ReqApiStudy, base_url, study_saved } from './../entpoint/RequestApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ModalForm({btnOpenModal, show, handleSave, CreateOrUpdateId,btnCloseModal }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      email: data.get('email'),
    });
    const param_saved = {name :  data.get('name'), email :  data.get('email') }
    ReqApiStudy(`${base_url}${study_saved}`,param_saved)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    show=false;
  };


  const CloseModalForm = ()=>{
   handleClose()
  }
  return (
    <div>
      <Button style={{marginBottom:30}} variant="contained" color="primary" onClick={btnOpenModal}>
        Create
      </Button>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            Modal Form
          </Typography>
          <form onSubmit={handleSave}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>

            <Button
              onClick={btnCloseModal}
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
            >
              close
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalForm;
