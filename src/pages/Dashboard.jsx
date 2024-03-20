import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Myproject from '../components/Myproject'
import Profile from '../components/Profile'


function Dashboard() {

  const [username, setUsername] = useState("")

  useEffect(()=>{
    setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
  },[])

  return (
    <>
    <Header dashboard/>
    <h1 className='m-3'>Welcome <span className='text-info'>{username}</span></h1>
    
      <Row className='container-fluid mt-5 mb-5 '>
        <Col lg={8}>
          <Myproject/>
        </Col>

        <Col lg={4}>
          <Profile/>
        </Col>
      </Row>
   
    </>
  )
}
 
export default Dashboard