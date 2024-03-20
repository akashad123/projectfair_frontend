import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Cards from '../components/Cards'
import { allProjectAPI } from '../services/allApi'
import { Link } from 'react-router-dom'

function Project() {

  const [allProject, setAllProject] = useState([])

  const [searchKey, setSearchKey] = useState("")

  const [isToken, setIsToken] = useState(false)

  useEffect(()=>{
    getAllProject()
  },[searchKey])

  console.log(searchKey);

  const getAllProject = async()=>{

    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result = await allProjectAPI(searchKey, reqHeader)
      console.log(result);
      if(result.status === 200){
        setAllProject(result.data)
      }
      else{
        console.log(result.response.data);
      }
    }
  }

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIsToken(true)  
    }
  }, [])

  console.log(allProject);

  return (
    <div>

      <Header/>
      <h1 className='mt-5 mb-5 text-center'>All Projects</h1>
      <input className='form-control w-25 mx-auto' onChange={(e)=>setSearchKey(e.target.value)} placeholder='Search projects using technologies' type="text"/>
      
      <Row className='container-fluid mt-5 mb-5'>
        { allProject?.length>0?
          allProject?.map((item)=>(<Col lg={4} md={6} sm={12}>
            <Cards project={item}/> 
         </Col>))
          :  <div> {isToken? <p className='text-center fw-bolder text-warning fs-3'>No projects based on this language</p> :
             <div className='d-flex justify-content-center align-items-center flex-column'>
                <img className='rounded' src="https://i.pinimg.com/originals/50/05/db/5005dbccb59bc9929274c043b848eb84.gif" height={'300px'} alt="" /> 
               <Link style={{textDecoration:'none'}} to={'/login'}><p className='fw-bolder m-3 fs-3'>Please login to see more projects</p></Link>
              </div>}
             </div>
        }
      </Row>
    </div>
  )
}
 
export default Project