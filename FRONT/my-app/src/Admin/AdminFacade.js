import React from 'react'
import AddAdmin from './AddAdmin'
import AddCustomerAdmin from './AddCustomerAdmin'
import DelAdmin from './DelAdmin'
import DelCustomer from './DelCustomer'
import MyCustomers from './MyCustomers'
import UpUserAuth from './UpUserAuth'
import AddAirline from './AddAirline'
import DelAirline from './DelAirline'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const AdminFacade = () => {
  return (
    <div>
        {/* <div>Admin Facade:<hr></hr>
      <UpUserAuth/><hr></hr>
      <MyCustomers/><hr></hr>
      <AddCustomerAdmin/><hr></hr>
      <DelCustomer/><hr></hr>
      <AddAirline/><hr></hr>
      <DelAirline/><hr></hr>
      <AddAdmin/><hr></hr>
      <DelAdmin/><hr></hr></div> */}
      {/* admin */}
      <Button><Link to="/addadmin">Add Admin</Link>{""}</Button>
      <Button><Link to="/addairline">Add Airline</Link>{""}</Button>
      <Button><Link to="/addcustomeradmin">Add Customer</Link>{""}</Button>
      <Button><Link to="/deladmin">Del Admin</Link>{""}</Button>
      <Button><Link to="/delairline">Del Airline</Link>{""}</Button>
      <Button><Link to="/delcustomer">Del Customer</Link>{""}</Button>
      <Button><Link to="/customers">All Customers</Link>{""}</Button>
      <Button><Link to="/upauth">Update Authorization</Link>{""}</Button>
    </div>
  )
}

export default AdminFacade

const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;