import React, { useState } from 'react'
import axios from 'axios'
import AdminFacade from './AdminFacade'

const AddCustomerAdmin = () => {
    const [first, setfirst] = useState("")
    const [last, setlast] = useState("")
    const [address, setadress] = useState("")
    const [phone, setphone] = useState("")
    const [credit, setcredit] = useState("")
    const [userID, setuserID] = useState('')

    const addcustomer = async () => {
        await axios.post(`http://127.0.0.1:8000/customers   `, {
            "user_id": userID,
            "first_name": first,
            "last_name": last,
            "address": address,
            "phone_no": phone,
            "credit_card_no": credit
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access")}`
            },
        })

            .then(function (response) {
                console.log(response);
                // setticket()
            })
            .catch(function (error) {
                console.log(error);
            });

    }
  return (
    // <div>
    //     <AdminFacade/>
    //     User ID :<input onChange={(e) => setuserID(e.target.value)} /><br/>
    //     First Name:<input onChange={(e) => setfirst(e.target.value)} /><br/>
    //     Last Name:<input onChange={(e) => setlast(e.target.value)} /><br/>
    //     Adress:<input onChange={(e) => setadress(e.target.value)} /><br/>
    //     Phone Number:<input onChange={(e) => setphone(e.target.value)} /><br/>
    //     Credit Card Number:<input onChange={(e) => setcredit(e.target.value)} /><br/>
    //     <button onClick={() => addcustomer()}>Add Customer</button>
    // </div>
    <div style={{ backgroundImage: `url(${'../../assets/planeLog.jpeg'})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="Auth-form-container">
    <div className="Auth-form">
      <div className="Auth-form-content">
        <div className="form-group mt-3">
          <label>User ID </label>
          <input
            className="form-control mt-1"
            onChange={(e) => setuserID(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>First Name</label>
          <input
            type="email"
            className="form-control mt-1"
            onChange={(e) => setfirst(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>Last Name</label>
          <input
            type="email"
            className="form-control mt-1"
            onChange={(e) => setlast(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>Adress</label>
          <input
            type="email"
            className="form-control mt-1"
            onChange={(e) => setadress(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>Phone Number</label>
          <input
            type="email"
            className="form-control mt-1"
            onChange={(e) => setphone(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>Credit Card Number</label>
          <input
            type="email"
            className="form-control mt-1"
            onChange={(e) => setcredit(e.target.value)}
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button onClick={()=>addcustomer()} className="btn btn-outline-danger">
          Add Customer
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AddCustomerAdmin