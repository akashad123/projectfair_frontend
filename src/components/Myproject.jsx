import React, { useContext, useEffect, useState } from 'react'
import Addproject from './Addproject'
import { deleteProjectAPI, userProjectAPI } from '../services/allApi'
import { addProjectResponseContext, editProjectResponseContext } from '../context/ContextShare'
import EditProject from './EditProject'



function Myproject() {

  const {addProjectResponse, setAddProjecResponse} = useContext(addProjectResponseContext)
  const {editProjectResponse, setEditProjecResponse} = useContext(editProjectResponseContext)

  const [userProject, setUserProject] = useState([])

  const getUserProject = async()=>{

    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }

    const result = await userProjectAPI(reqHeader)
    /* console.log(result.data); */
    setUserProject(result.data)    
  }

  /* console.log(userProject); */

  // Delete function
  const handleDelete = async(id)=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    const result = await deleteProjectAPI(id, reqHeader)
    console.log(result);
    if(result.status === 200){
      getUserProject()
    }
    else{
      console.log(result.response.data);
    }
  }

  useEffect(()=>{
    getUserProject()
  }, [addProjectResponse,editProjectResponse])

  return (
    <>
    <div className='card shadow p-2'>
      <div className='d-flex p-2'>
        <h3>My projects</h3>
        <div className='ms-auto'><Addproject/></div>
      </div>
      { userProject.length>0?
        userProject.map((item)=>(<div className='border rounded p-2 w-100 mb-3 bg-light d-flex justify-content-between'>
        <h4>{item.title}</h4>
        <div className='d-flex gap-2'>
          <EditProject project = {item}/>
          <a href={item.github} target='_blank' className='btn btn-outline-info'><i class="fa-brands fa-github"></i></a>
          <button onClick={()=>handleDelete(item._id)} className='btn btn-outline-warning'><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>))
        :
      <p className='fw-bolder text-warning mt-3 ms-3'>No projects uploaded yet !</p>
      }
    </div>

    

      

    </>
  )
}  

export default Myproject  