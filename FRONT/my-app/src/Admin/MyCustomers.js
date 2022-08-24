import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AdminFacade from './AdminFacade';
import Table from 'react-bootstrap/Table';

const MyCustomers = () => {
    const [customers, setcustomer] = useState([])
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        getcustomer()
    }, [])
    

    const getcustomer = async () => {
        setHidden(!hidden)
        axios.get('http://127.0.0.1:8000/customers    ',
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access")}`
            },
        }).
            then(function (response) {
                setcustomer(response.data)
            })
            .catch(function (error) {
                console.log(error);


            });

    }
    return (
        // <div style={{ backgroundImage: `url(${'../../assets/planeLog.jpeg'})`, backgroundSize: 'cover', backgroundPosition: 'center' ,height:'700px'}}>
        //     <center><button style={{marginTop:'50px'}} onClick={() => getcustomer()} className='btn btn-primary'>Customers</button></center>
        //     {hidden && customers.length > 0 && customers.map((customer, ind) => <div style={{backgroundColor:'white',marginTop:'10px'}} key={ind}>
        //         ID : {customer.id} {" "}\
        //         First Name : {customer.first_name}{" "}\
        //         Last Name : {customer.last_name}{" "}\
        //         Address : {customer.address}{" "}\
        //         Phone : {customer.phone_no}{" "}\
        //         Credit Card: {customer.credit_card_no}{" "}\
        //         User ID  : {customer.user_id}{" "}<br></br>
        //     </div>)}
        // </div>
        <div>
        < Table striped bordered hover >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Credit Card</th>
                    <th>User ID</th>
                </tr>
                </thead>


            {customers.map((customer, ind) => 
            <thead>
                        <tr key={ind}>
                            <th>{customer.id}</th>
                            <th>{customer.first_name} {customer.last_name}</th>
                            <th>{customer.address}</th>
                            <th>{customer.phone_no}</th>
                            <th>{customer.credit_card_no}</th>
                            <th>{customer.user_id}</th>
                        </tr>
                        </thead>
        )}
        </Table >
    </div>
        
    )
}

export default MyCustomers