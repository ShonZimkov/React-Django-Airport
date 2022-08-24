import React from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';


const CustomerFacade = () => {
  return (
    <div>
      <style type="text/css">
        {`
    .btn-flat {
      background-color: red;
      border-color:white;
      color: white;
    }
    
    .btn-xxl {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    `}
      </style>
      
      <Link to="/upcustomer">
      <Button   variant="flat">Update Customer</Button>&nbsp;&nbsp;
      </Link>
      <Link to="/tickets">
      <Button variant="primary">My Tickets</Button>&nbsp;&nbsp;
      </Link>
      <Link to="/addcustomer">
      <Button variant="outline-primary">Add Customer</Button>&nbsp;&nbsp;
      </Link>
    </div>
  )
}

export default CustomerFacade