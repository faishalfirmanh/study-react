import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ReqApiStudy, base_url, study_saved } from '../entpoint/RequestApi';

const ModalCustom = ({ show, onHide, onSave, item, isEditMode, nameParent, emailParent }) => {
  const [formData, setFormData] = useState({ name: '', email :'' });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    console.log("use effect ",item)
    if (isEditMode && item) {
      setFormData({ name: name, email:email });
    } else {
      setFormData({ name: "" , email:""});
      setName("");
      setEmail("");
    }
  }, [item, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e) => {
   setEmail(e.target.value)
  };

  const handleSubmit = () => {
    
    const param_saved = {name :  name, email :  email }
    ReqApiStudy(`${base_url}${study_saved}`,param_saved)
    .then(function (response) {
      console.log(response.data);
      show=false
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? 'Edit Item' : 'Create Item'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={handleChangeName}
            />
          </Form.Group>
        </Form>
        <Form>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={email}
              onChange={handleChangeEmail}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>{isEditMode ? 'Save Changes' : 'Create'}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCustom;
