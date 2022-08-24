import React, { useState } from 'react'
import axios from 'axios'
import jwt_decode from "jwt-decode";
import AirlineFacade from './AirlineFacade';



const UpAirline = () => {
    const [name, setname] = useState("")
    const [country, setcountry] = useState("")
    const [address, setadress] = useState("")
    const [phone, setphone] = useState("")
    const [credit, setcredit] = useState("")
    // const [custID, setcustID] = useState("")

    
    const upairline = async () => {
        await axios.put(`http://127.0.0.1:8000/updateair   `, {
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
    // console.log(jwt_decode(localStorage.getItem("access")).user_id)

  return (
    // <div>
    //     <AirlineFacade/>
    //     Name:<input onChange={(e) => setname(e.target.value)} /><br/>
    //     Country ID:<input onChange={(e) => setcountry(e.target.value)} /><br/>
    //     {/* <button onClick={() => setcustID(jwt_decode(localStorage.getItem("access")).user_id)}>Update Customer data</button> */}
    //     <button onClick={() => upairline()}>Confirm Update</button>
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
            className="form-control mt-1"
            onChange={(e) => setcountry(e.target.value)}
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button onClick={()=>upairline()} className="btn btn-outline-danger">
          Confirm Update
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UpAirline