
import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';


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

function ModalComponent({ initialData, handleSubmit }) {
    const [formData, setFormData] = useState(initialData || { name: '', description: '' });

    useEffect(() => {
        setFormData(initialData || { name: '', description: '' });
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(formData);
    };
  return (
    <div>
      
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            Modal Form
          </Typography>
          <form onSubmit={onSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.name}
              onChange={handleChange}
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

            {/* <Button
              onClick={closeModall}
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
            >
              close
            </Button> */}
          </form>
        </Box>
    </div>
  );
}

export default ModalComponent;
