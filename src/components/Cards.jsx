import React from 'react'
import Card from 'react-bootstrap/Card';
import mediaPlayer from '../Images/projectcard.png'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { BASE_URL } from "../services/baseurl"


function Cards({project}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        
        <Card className='btn' onClick={handleShow}>
            <Card.Img variant="top" src={project?`${BASE_URL}/uploads/${project.projectImage}`:mediaPlayer} />
            <Card.Body>
            <Card.Title className='text-center'>{project.title}</Card.Title>
            </Card.Body>
        </Card>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Row>
          <Col md={6}>
            <img width='100%' height='200px' src={mediaPlayer} alt="" /> 
          </Col>
          <Col md={6}>
          <h3>Description</h3>  
          <p>{project.overview}</p>
          <p><span className='fs-5'>Technologies</span> : {project.language}</p>
          </Col>
         </Row>
         <div className='d-flex ms-5 fs-1 gap-5 mt-3'>
          <a href={project.github} target='_blank'><i class="fa-brands fa-github" style={{color:'black'}}></i></a>
          <a href={project.website} target='_blank'><i class="fa-solid fa-link" style={{color:'black'}}></i></a>
         </div>
        </Modal.Body>
      </Modal>

    </>
  )
}

export default Cards