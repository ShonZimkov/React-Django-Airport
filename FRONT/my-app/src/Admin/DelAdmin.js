import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import AdminFacade from './AdminFacade'


const DelAdmin = () => {
    const [adminID, setadminID] = useState("")

    const deladmin = async (id) => {
        console.log(id)
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("access")}`
        };
        axios.delete(`http://127.0.0.1:8000/adminstrators/${id}   `,{headers})
            .then(function (response) {
                console.log(response.data);
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }
  return (
    // <div>
    //     <AdminFacade/>
    //     Admin ID:<input onChange={(e) => setadminID(e.target.value)} /><br/>
    //     <button onClick={()=>deladmin(adminID)}>Delete Admin</button>
    // </div>
    <div style={{ backgroundImage: `url(${'../../assets/planeLog.jpeg'})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="Auth-form-container">
    <div className="Auth-form">
      <div className="Auth-form-content">
        <div className="form-group mt-3">
          <label>Admin ID</label>
          <input
            className="form-control mt-1"
            onChange={(e) => setadminID(e.target.value)}
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button onClick={()=>deladmin(adminID)} className="btn btn-outline-danger">
          Delete Admin
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default DelAdmin