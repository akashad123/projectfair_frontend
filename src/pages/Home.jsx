import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import homeBg from '../Images/home.gif'
import Cards from '../components/Cards'
import { Link } from 'react-router-dom'
import { homeProjectAPI } from '../services/allApi'

function Home() {

  const [isLogin, setIsLogin] = useState(false)
  const [homeProject, setHomeProject] = useState([])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIsLogin(true)
    }
  },[])

  // Get homeProject
  const getHomeProject = async()=>{
    const result = await homeProjectAPI()
    console.log(result.data);
    setHomeProject(result.data)
  }

  useEffect(()=>{
    getHomeProject()
  },[])

  return (
    <>
    <div style={{height:'100vh', width:'100%', backgroundColor:'lightgreen'}}>
      <div className='container-fluid rounded'>
        <Row className='align-items-center mt-5 p-5'>
          <Col sm={12} md={6}>
            <h1 style={{fontSize:'60px'}}>PROJECT FAIR</h1>
            <p>One stop destination for all software development projects</p>

            { isLogin?
              <Link to={'/dashboard'}><button className='btn btn-success rounded'>Manage projects <i class="fa-solid fa-arrow-right ms-2"></i></button></Link>:
            <Link to={'/login'}><button className='btn btn-success rounded'>Get started <i class="fa-solid fa-arrow-right ms-2"></i></button></Link> }
            
          </Col>
          <Col sm={12} md={6}>
            <img src={homeBg} className='w-100 rounded shadow' alt="" />
          </Col>
        </Row>
      </div>
    </div>

    <div>

    <h1 className='text-center mt-5'>All projects</h1>
    <marquee scrollAmount={25}>
      <div className='d-flex mt-5'>
         
          { homeProject?.length>0?
            homeProject?.map(item=>(
              <div className='ms-5 shadow' style={{width:'500px'}}><Cards project={item}/></div>
            ))
            : null
          }
  
          
  
        </div>
    </marquee>

    <div className='text-center mt-5 mb-5'>
    
    <Link to={'/project'}>See more projects</Link>
  
    </div>
    </div>
    </>
  )
}
 
export default Home