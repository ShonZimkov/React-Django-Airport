import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { GiRocketFlight } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAuth, selectLog } from '../Anonymus/LogSlice';




function NavbarBar() {
  const auth = localStorage.getItem('auth')
  const log = useSelector(selectLog)
  const [reload, setreload] = useState('')

  useEffect(() => {
    setreload(auth)
  }, [])
  

  return (
    <Navbar bg="light" expand="lg" variant='light' className='rowC color-black' >
      <Container>
      <Link to='/' className='text-decoration-none'>
        <Navbar.Brand >
          <GiRocketFlight style={{color: 'red', fontSize: '50px'}}></GiRocketFlight>  Shon Port
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link ><Link to='/baseflights' className='text-decoration-none' style={{ color: 'black' }}>All Flights</Link></Nav.Link>
          <Nav.Link><Link to='/baseairlines' className='text-decoration-none' style={{ color: 'black' }}>All Airlines</Link></Nav.Link>
          <Nav.Link><Link to='/basecountries' className='text-decoration-none' style={{ color: 'black' }}>All Countries</Link></Nav.Link>
          <Nav.Link><Link to='/basedepartures' className='text-decoration-none' style={{ color: 'black' }}>Departures in 12 Hours</Link></Nav.Link>
          {auth === 'customer' &&
          <NavDropdown title="Customer" id="basic-nav-dropdown"  >
          <NavDropdown.Item  ><Link to='/upcustomer' className='text-decoration-none' style={{ color: 'black' }}>Update Customer</Link></NavDropdown.Item>
          <NavDropdown.Item  ><Link to='/tickets' className='text-decoration-none' style={{ color: 'black' }}>Tickets</Link></NavDropdown.Item>
          <NavDropdown.Item  ><Link to='/addcustomer' className='text-decoration-none' style={{ color: 'black' }}>Add Customer</Link></NavDropdown.Item>
          
        </NavDropdown>}
            {auth === 'staff' && 
            <NavDropdown title="Airline" id="basic-nav-dropdown"  >
            <NavDropdown.Item  ><Link to='/addflight' className='text-decoration-none' style={{ color: 'black' }}>Add Flight</Link></NavDropdown.Item>
            <NavDropdown.Item  ><Link to='/airlineflights' className='text-decoration-none' style={{ color: 'black' }}>My Flights</Link></NavDropdown.Item>
            <NavDropdown.Item  ><Link to='/upairline' className='text-decoration-none' style={{ color: 'black' }}>Update Airline</Link></NavDropdown.Item>
            <NavDropdown.Item  ><Link to='/upflight' className='text-decoration-none' style={{ color: 'black' }}>Update Flight</Link></NavDropdown.Item>
            
          </NavDropdown>}
            {auth === 'superuser' && 
            <NavDropdown title="Admin" id="basic-nav-dropdown"  >
              <NavDropdown.Item  ><Link to='/addadmin' className='text-decoration-none' style={{ color: 'black' }}>Add Admin</Link></NavDropdown.Item>
              <NavDropdown.Item  ><Link to='/addairline' className='text-decoration-none' style={{ color: 'black' }}>Add Airline</Link></NavDropdown.Item>
              <NavDropdown.Item  ><Link to='/addcustomeradmin' className='text-decoration-none' style={{ color: 'black' }}>Add Customer</Link></NavDropdown.Item>
              <NavDropdown.Item  ><Link to='/deladmin' className='text-decoration-none' style={{ color: 'black' }}>Del Admin</Link></NavDropdown.Item>
              <NavDropdown.Item  ><Link to='/delairline' className='text-decoration-none' style={{ color: 'black' }}>Del Airline</Link></NavDropdown.Item>
              <NavDropdown.Item  ><Link to='/delcustomer' className='text-decoration-none' style={{ color: 'black' }}>Del Customer</Link></NavDropdown.Item>
              <NavDropdown.Item  ><Link to='/customers' className='text-decoration-none' style={{ color: 'black' }}>Customers</Link></NavDropdown.Item>
              <NavDropdown.Item  ><Link to='/upauth' className='text-decoration-none' style={{ color: 'black' }}>Update Auth</Link></NavDropdown.Item>
              
            </NavDropdown>
              }
            <NavDropdown title="My Account" id="basic-nav-dropdown"  >
              {!log  && <NavDropdown.Item  ><Link to='/login' className='text-decoration-none' style={{ color: 'black' }}>Login</Link></NavDropdown.Item>}
              {log  &&<NavDropdown.Item >
               <Link to='/logout' className='text-decoration-none' style={{ color: 'black' }}>Logout</Link>
              </NavDropdown.Item>}
              {auth === 'staff' &&<NavDropdown.Item  ><Link to='/addairline' className='text-decoration-none' style={{ color: 'black' }}>Add Profile</Link></NavDropdown.Item>}

              {/* <NavDropdown.Divider /> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default NavbarBar;