import React, { useState } from 'react'
import axios from 'axios'
import AirlineFacade from './AirlineFacade'

const AddFlight = () => {
    const [origin, setorigin] = useState("")
    const [destination, setdestination] = useState("")
    const [departue, setdepartue] = useState("")
    const [landing, setlanding] = useState("")
    const [tickets, settickets] = useState("")

    const addflight = async () => {
        await axios.post(`http://127.0.0.1:8000/flights   `, {
            "origin_country_id": origin,
            "destination_country_id": destination,
            "departure_time": departue,
            "landing_time": landing,
            "remaining_tickets": tickets
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
    //     <AirlineFacade/>
    //     Origin Country ID :<input onChange={(e) => setorigin(e.target.value)} /><br/>
    //     Destination Country ID:<input onChange={(e) => setdestination(e.target.value)} /><br/>
    //     Departure Time:<input onChange={(e) => setdepartue(e.target.value)} /><br/>
    //     Landing Time:<input onChange={(e) => setlanding(e.target.value)} /><br/>
    //     Remaining Tickets:<input onChange={(e) => settickets(e.target.value)} /><br/>
    //     <button onClick={() => addflight()}>Add Flight</button>
    // </div>
    <div style={{ backgroundImage: `url(${'../../assets/planeLog.jpeg'})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="Auth-form-container">
    <div className="Auth-form">
      <div className="Auth-form-content">
        <div className="form-group mt-3">
          <label>Origin Country ID</label>
          <input
            className="form-control mt-1"
            onChange={(e) => setorigin(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>Destination Country ID</label>
          <input
            className="form-control mt-1"
            onChange={(e) => setdestination(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>Departure Time</label>
          <input
            className="form-control mt-1"
            onChange={(e) => setdepartue(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>Landing Time</label>
          <input
            className="form-control mt-1"
            onChange={(e) => setlanding(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>Remaining Tickets</label>
          <input
            className="form-control mt-1"
            onChange={(e) => settickets(e.target.value)}
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button onClick={()=>addflight()} className="btn btn-outline-danger">
          Add Flight
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AddFlight