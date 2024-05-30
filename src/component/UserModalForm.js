import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { ReqApiStudy, study_getId, study_saved, base_url } from '../entpoint/RequestApi';
import ButtonCustom from './ButtonCustom';

const UserModalForm = ({ show, handleClose, userId, refreshData }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (userId) {
        console.log("idnya ",userId)
      // Fetch user data if userId is provided (for update)
      const urlGet = `${base_url}${study_getId}`;
      const param = {id : userId}
      ReqApiStudy(urlGet, param)
      .then(function (response) {
        console.log("respones from ok modal",response.data.data.name)
        console.log("respones from ok email",response.data.data.email)
        if (response.data.status == "ok") {
            setName(response.data.data.name)
            setEmail(response.data.data.email)
        }
      })
      .catch(function (error) {
        alert("gagal save")
      })
     
    } else {
      // Reset form if no userId (for create)
      setName('');
      setEmail('');
    }
  }, [userId]);

  const handleSubmit = (event) => {
        event.preventDefault();

        const user = { name, email };
        const urlGet = `${base_url}${study_saved}`;
        const param = userId !== null ? {id : userId, name : name, email : email} :  {name : name, email : email}
   
        ReqApiStudy(urlGet, param)
        .then(function (response) {
            console.log("sukses saved ",response)
            refreshData();
            handleClose();
        })
        .catch(function (error,xhr) {
            if (error.response.data.data.email[0]) {
                alert(error.response.data.data.email[0])
            }else{
                alert("saved failed")
            }
            
        })
     
    }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{userId ? 'Update User' : 'Create User'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <div style={{marginTop:10}}>
              <ButtonCustom typeButton={"submit"} label={userId ? 'Update' : 'Create'} variant="primary" size="sm"/>
          </div>
       
        
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserModalForm;
