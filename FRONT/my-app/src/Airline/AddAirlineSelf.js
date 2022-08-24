import React, { useState } from 'react'
import axios from 'axios'

const AddCustomerAdmin = () => {
    const [name, setname] = useState("")
    const [country, setcountry] = useState('')

    const addairline = async () => {
        await axios.post(`http://127.0.0.1:8000/addairline   `, {
            "name": name,
            "country_id": country
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
    //     Name :<input onChange={(e) => setname(e.target.value)} /><br/>
    //     Country ID :<input onChange={(e) => setcountry(e.target.value)} /><br/>
    //     <button onClick={() => addairline()}>Add Airline</button>
    // </div>
    <div style={{ backgroundImage: `url(${'../../assets/planeLog.jpeg'})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="Auth-form-container">
    <div className="Auth-form">
      <div className="Auth-form-content">
        <div className="form-group mt-3">
          <label>Name</label>
          <input
            className="form-control mt-1"
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>Country ID</label>
          <input
            type="email"
            className="form-control mt-1"
            onChange={(e) => setcountry(e.target.value)}
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button onClick={()=>addairline()} className="btn btn-outline-danger">
          Add Airline
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AddCustomerAdmin