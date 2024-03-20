import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    
<div style={{height:'300px',backgroundColor:'lightgreen'}} className='d-flex justify-content-center align-items-center flex-column pt-4  shadow'>
       
<div className="row d-flex justify-content-center align-items-center">

<div className="col-4 ">
    <h3 style={{overflowY:'hidden'}}>Company name</h3>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sequi animi saepe incidunt ullam, qui laborum, repellendus error quam asperiores, unde iure ipsa perspiciatis pariatur. Ratione, qui deserunt. Sequi, provident?</p>
</div>

<div className="col-2 ">
    <h3 style={{overflowY:'hidden'}}>Products</h3>
    <div className='d-flex flex-column'>
        <Link style={{textDecoration:'none', color:'black'}}>Angular</Link>
        <Link style={{textDecoration:'none', color:'black'}}>React</Link>
        <Link style={{textDecoration:'none', color:'black'}}>Vue</Link>
        <Link style={{textDecoration:'none', color:'black'}}>Laravel</Link>
        <Link style={{textDecoration:'none', color:'black'}}>Node</Link>
    </div>
</div>

<div className="col-2 ">
    <h3 style={{overflowY:'hidden'}}>Useful links</h3>
    <div className='d-flex flex-column'>
        <Link to={'/'} style={{textDecoration:'none', color:'black'}}>Home</Link>
        <Link to={'/login'} style={{textDecoration:'none', color:'black'}}>Log in</Link>
        <Link to={'/register'} style={{textDecoration:'none', color:'black'}}>Register</Link>
        <Link to={'/project'} style={{textDecoration:'none', color:'black'}}>Project</Link>
        <Link to={'/dashboard'} style={{textDecoration:'none', color:'black'}}>Dashboard</Link>
    </div>
</div>

<div className="col-3 ">
    <h3 style={{overflowY:'hidden'}}>Contact</h3>
    <p>New york, NY 10012, US</p>
    <p>info@gmail.com</p>
    <p>+ 01 122 345 338</p>
</div>

</div>

<p className='mt-5'>Copyright © 2023 Project Fair. Built with React</p>
       
</div>
  )
}
 
export default Footer