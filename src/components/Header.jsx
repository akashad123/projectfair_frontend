import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../context/ContextShare';

function Header({dashboard}) {

  const {isAuthToken, setIsAuthToken} = useContext(isAuthTokenContext)

  const navigate = useNavigate()
  
  const handleLogout = ()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    navigate('/')
    setIsAuthToken(false)
  }

  return (
    <div>
        <Navbar className='p-3' style={{backgroundColor:'lightgreen'}}>
        <Container>
          <Link to={'/'} style={{overflowY:'hidden', textDecoration:'none'}}>
              <Navbar.Brand>
                <span className='fs-4'>
                    <i class="fa-brands fa-stack-overflow me-3"></i>
                    PROJECT FAIR
                </span>
              </Navbar.Brand>
          </Link>
          { dashboard &&
            <Link><button onClick={handleLogout} className='btn btn-warning'>Log out <i class="fa-solid fa-power-off"></i></button></Link>
            }
        </Container> 
      </Navbar>
    </div>
  )
}

export default Header