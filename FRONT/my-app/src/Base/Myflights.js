import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import jwt_decode from "jwt-decode";


const Myflights111 = () => {
    const [flights, setflight] = useState([])
    const [hidden, setHidden] = useState(false);
    const [ticket, setticket] = useState(0);
    const [FlightID, setFlightID] = useState("")
    const [flightbyid, setflightbyid] = useState([])
    const [customer, setcustomer] = useState("")

    const getflight = async () => {
        setHidden(!hidden)
        axios.get('http://127.0.0.1:8000/getflights    ').
            then(function (response) {
                setflight(response.data)
                setcustomer(jwt_decode(localStorage.getItem("access")).token_type)
            })
            .catch(function (error) {
                console.log(error);


            });

    }


    const getflightID = async (id) => {
        await axios.get(`http://127.0.0.1:8000/getflights/${id} `).
            then(function (response) {
                setflightbyid(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }




    const addticket = async () => {
        await axios.post(`http://127.0.0.1:8000/addticket   `, {
            "flight_id": ticket
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
        <div>
            <button onClick={() => getflight()}>Flights</button>
            {<div>
                {hidden && flights.map((flight, ind) => <div key={ind}>
                    ID : {flight.id} {" "}\
                    Airline : {flight.airline_company}{" "}\
                    Origin Country : {flight.origin_country}{" "}\
                    Destination Country : {flight.destination_country}{" "}\
                    Departure Time : {flight.departure_time}{" "}\
                    Landing Time : {flight.landing_time}{" "}\
                    Tickets Remaining : {flight.remaining_tickets}{" "}<br></br>
                    {hidden && customer === "access"  && <button onClick={() => setticket(flight.id)}>Buy Ticket</button>}
                </div>)}
                {hidden && ticket > 0 &&  <div><br></br>
                    Flight No : {ticket} Press Confirm to Buy<br></br>
                    <button onClick={() => addticket()}>Confirm Buy</button></div>}
                Flight ID:<input onChange={(e) => setFlightID(e.target.value)} />
                <button onClick={() => getflightID(FlightID)}>Flight By ID</button><br></br>
                {FlightID !== "" &&
                    <div>
                        ID : {flightbyid.id} {" "}\
                        Airline : {flightbyid.airline_company}{" "}\
                        Origin Country : {flightbyid.origin_country}{" "}\
                        Destination Country : {flightbyid.destination_country}{" "}\
                        Departure Time : {flightbyid.departure_time}{" "}\
                        Landing Time : {flightbyid.landing_time}{" "}\
                        Tickets Remaining : {flightbyid.remaining_tickets}{" "}<br></br>
                    </div>}
            </div>}
            
        </div>
    )
}

export default Myflights111