import React, { useState } from 'react'
import axios from 'axios'
import AdminFacade from './AdminFacade'

const AddAdmin = () => {
    const [first, setfirst] = useState("")
    const [last, setlast] = useState("")
    

    const addadmin = async () => {
        await axios.post(`http://127.0.0.1:8000/adminstrators   `, {
            "first_name": first,
            "last_name": last
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
    //     First Name:<input onChange={(e) => setfirst(e.target.value)} /><br/>
    //     Last Name:<input onChange={(e) => setlast(e.target.value)} /><br/>
    //     <button onClick={() => addadmin()}>Add Admin Profile</button>
    // </div>
    <div style={{ backgroundImage: `url(${'../../assets/planeLog.jpeg'})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="Auth-form-container">
    <div className="Auth-form">
      <div className="Auth-form-content">
        <div className="form-group mt-3">
          <label>First Name</label>
          <input
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
        <div className="d-grid gap-2 mt-3">
          <button onClick={()=>addadmin()} className="btn btn-outline-danger">
            Add Admin Profile
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AddAdmin