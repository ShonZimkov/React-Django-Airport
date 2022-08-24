import React, { useState } from 'react'
import axios from 'axios'
import jwt_decode from "jwt-decode";
import AdminFacade from './AdminFacade';



const UpUserAuth = () => {
    const [userID, setuserID] = useState("")
    const [superuser, setsuperuser] = useState("")
    const [active, setactive] = useState("")
    const [staff, setstaff] = useState("")
    // const [custID, setcustID] = useState("")

    
    const upuser = async () => {
        await axios.put(`http://127.0.0.1:8000/upuserauth   `, {
            "user_id": userID,
            "is_active": active,
            "is_staff": staff,
            "is_superuser": superuser
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
    //     <AdminFacade/>
    //     User ID:<input onChange={(e) => setuserID(e.target.value)} /><br/>
    //     Active:<input onChange={(e) => setactive(e.target.value)} /><br/>
    //     Staff:<input onChange={(e) => setstaff(e.target.value)} /><br/>
    //     SuperUser:<input onChange={(e) => setsuperuser(e.target.value)} /><br/>
    //     {/* <button onClick={() => setcustID(jwt_decode(localStorage.getItem("access")).user_id)}>Update Customer data</button> */}
    //     <button onClick={() => upuser()}>Confirm Update</button>
    // </div>
    <div style={{ backgroundImage: `url(${'../../assets/planeLog.jpeg'})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="Auth-form-container">
    <div className="Auth-form">
      <div className="Auth-form-content">
        <div className="form-group mt-3">
          <label>User ID</label>
          <input
            className="form-control mt-1"
            onChange={(e) => setuserID(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>Active</label>
          <input
            className="form-control mt-1"
            onChange={(e) => setactive(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>Staff</label>
          <input
            className="form-control mt-1"
            onChange={(e) => setstaff(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>SuperUser</label>
          <input
            className="form-control mt-1"
            onChange={(e) => setsuperuser(e.target.value)}
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button onClick={()=>upuser()} className="btn btn-outline-danger">
          Confirm Update
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UpUserAuth