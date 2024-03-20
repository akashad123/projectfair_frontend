import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import { addProjectAPI } from '../services/allApi';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectResponseContext } from '../context/ContextShare';

function Addproject() {

  // useContext hook is used to access the context
  const {addProjectResponse, setAddProjecResponse} = useContext(addProjectResponseContext)

  const [projectDetails, setProjectDetails] = useState({
    title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projectImage:""
  })

  /* console.log(projectDetails); */

  const [preview, setPreview] = useState("")

  // State to get token
  const [token, setToken] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  }, [])

  useEffect(()=>{
    projectDetails.projectImage &&
    setPreview(URL.createObjectURL(projectDetails.projectImage)) // Converts file into url
  })

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    handleClear()
  }
  const handleClear = () => {
    setProjectDetails({
      title:"",
      language:"",
      github:"",
      website:"",
      overview:"",
      projectImage:""
    })
    setPreview("")
  }
  const handleShow = () => setShow(true);

  // Function to add project
  const handleUpload = async(e)=>{
    e.preventDefault()

    const {title, language, github, website, overview, projectImage} = projectDetails

    if(title || language || github || website || overview || projectImage){

      // reqBody creation
      // 1.Create an object for Formdata() class since we have uploaded contents
      const reqBody = new FormData()
      // 2.Add data using append()   
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage)

      // reqHeader
      if(token) { 
        const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }

      const result = await addProjectAPI(reqBody, reqHeader)
      console.log(result);

      if(result.status===200){
        console.log(result.data);
        toast.success('Project added successfully')
        handleClose()
        setAddProjecResponse(result.data)
      }
      else{
        alert(result.response.data)
        handleClear()
      }

    }}
    else{
      toast.warning('Please fill the details completely')
    }
  }


  return (
    <>
      <button className='btn btn-outline-info' onClick={handleShow}>Add Project</button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload project</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Row>
            <Col>
            <label htmlFor='upload'>
              <input onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} id='upload' type="file" style={{display:"none"}}/>
              <img className='rounded' style={{cursor:'pointer'}} src={preview?preview:"https://w0.peakpx.com/wallpaper/777/7/HD-wallpaper-camera-vector-minimalism-camera-minimalism-vector.jpg"}  width={'100%'} height={'350px'} />
            </label>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} type="text" placeholder="Project title" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} type="text" placeholder="Languages used" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} type="text" placeholder="Github link" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} type="text" placeholder="Website link" />
              </Form.Group>
              <textarea value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} placeholder='Project overview' className='form-control' cols="30" rows="3"></textarea>
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="success" onClick={handleUpload}>Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer theme='colored' position='top-center' autoClose={3000}/>

    </>
  )  
}

export default Addproject