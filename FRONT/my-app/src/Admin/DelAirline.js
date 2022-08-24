import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import AdminFacade from './AdminFacade'


const DelCustomer = () => {
    const [airID, setairID] = useState("")

    const delticket = async (id) => {
        console.log(id)
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("access")}`
        };
        axios.delete(`http://127.0.0.1:8000/air_companies/${id}   `,{headers})
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
    //     Airline ID:<input onChange={(e) => setairID(e.target.value)} /><br/>
    //     <button onClick={()=>delticket(airID)}>Delete Airline</button>
    // </div>
    <div style={{ backgroundImage: `url(${'../../assets/planeLog.jpeg'})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="Auth-form-container">
    <div className="Auth-form">
      <div className="Auth-form-content">
        <div className="form-group mt-3">
          <label>Airline ID</label>
          <input
            className="form-control mt-1"
            onChange={(e) => setairID(e.target.value)}
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button onClick={()=>delticket(airID)} className="btn btn-outline-danger">
          Delete Airline
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default DelCustomer