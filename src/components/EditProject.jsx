import React, { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';
import { editProjectAPI } from '../services/allApi';
import { editProjectResponseContext } from '../context/ContextShare';

function EditProject({project}) {

    const [show, setShow] = useState(false);

    const {editProjectResponse, setEditProjecResponse} = useContext(editProjectResponseContext)

    // State to hold values of input box
    const [projectDetails, setProjectDetails] = useState({
        id:project._id,
        title:project.title,
        language:project.language,
        github:project.github,
        website:project.website,
        overview:project.overview,
        projectImage:""
      })

    const [preview, setPreview] = useState("")  

    const handleClose = () => {
      setShow(false)
      cancelChange()
    }
    const handleShow = () => setShow(true);

    const cancelChange = ()=>{
        setProjectDetails({
            title:project.title,
            language:project.language,
            github:project.github,
            website:project.website,
            overview:project.overview,
            projectImage:""
        })
        setPreview("")
    }

    useEffect(()=>{
        if(projectDetails.projectImage){
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
    }, [projectDetails.projectImage])

    const handleUpdate = async(e)=>{
        e.preventDefault()

        const {id, title, language, github, website, overview, projectImage} = projectDetails

        if(title || language || github || website || overview){

            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("language", language)        
            reqBody.append("github", github)
            reqBody.append("website", website)
            reqBody.append("overview", overview)
            preview?reqBody.append("projectImage", projectImage):reqBody.append("projectImage", project.projectImage)

            const token = sessionStorage.getItem("token")

        if(preview){
            const reqHeader = {
                "Content-Type":"multipart/form-data",
                "Authorization":`Bearer ${token}`
              } 

            const result = await editProjectAPI(id, reqBody, reqHeader)
            console.log(result);

            if(result.status === 200){
              alert('Updated successfully')
              handleClose()
              setEditProjecResponse(result.data)
            }
            else{
              console.log(result.response.data);
            }
        }

        else{
            const reqHeader = {
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
              }
            const result = await editProjectAPI(id, reqBody, reqHeader)
            console.log(result);

             if(result.status === 200){
              alert('Updated successfully')
              handleClose()
              setEditProjecResponse(result.data)
            }
            else{
              console.log(result.response.data);
            }
        }

        }

        else{
            alert('Please fill the form completely')
        }
    }

  return (
    <>
        <button onClick={handleShow} className='btn btn-outline-success'><i class="fa-regular fa-pen-to-square"></i></button>

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit project details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Row>
            <Col>
            <label htmlFor='upload'>
              <input id='upload' type="file" onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} style={{display:"none"}}/>
              <img className='rounded' style={{cursor:'pointer'}} src={preview?preview:`${BASE_URL}/uploads/${project.projectImage}`}  width={'100%'} height={'350px'}/>
            </label>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Project title" value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Languages used" value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Github link" value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Website link" value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}/>
              </Form.Group>
              <textarea placeholder='Project overview' className='form-control' cols="30" rows="3" value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}></textarea>
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={cancelChange}>
            Cancel changes
          </Button>
          <Button variant="success" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditProject