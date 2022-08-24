import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import AirlineFacade from './AirlineFacade';
import { Card, Col, Row, Image } from 'react-bootstrap'


const AirlineFlights = () => {
    const [hidden, setHidden] = useState(false);
    const [flights, setflight] = useState([])


    useEffect(() => {
        airlineflights()
    }, [])
    

    const airlineflights = async () => {
        setHidden(!hidden)
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("access")}`
        };
        axios.get(`http://127.0.0.1:8000/getairflights   `, { headers }).
            then(function (response) {
                console.log(response.data);
                setflight(response.data)
                // console.log(jwt_decode(localStorage.getItem("access")))
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const delflight = async (id) => {
        console.log(id)
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("access")}`
        };
        axios.delete(`http://127.0.0.1:8000/flights/${id}   `, { headers })
            .then(function (response) {
                console.log(response.data);
                setHidden(!hidden)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        // <div style={{ backgroundImage: `url(${'../../assets/planeLog.jpeg'})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '700px' }}>
        //     <center><button style={{ marginTop: '50px' }} onClick={() => airlineflights()} className='btn btn-primary'>My Flights</button></center>
        //         {<div style={{
        //             width: "100%",
        //             display: "flex",
        //             flexWrap: "wrap",
        //             justifyContent: "space-around",
        //             backgroundColor:'white'
        //         }}>
        //             {hidden && flights.length > 0 ? flights.map((flight, ind) => <div className='col-4'  key={ind}>
        //                 ID : {flight.id} {" "}<br />
        //                 Airline Company : {flight.airline_company}{" "}<br />
        //                 Origin : {flight.origin_country}{" "}<br />
        //                 Destination : {flight.destination_country}{" "}<br />
        //                 Departure Time : {flight.departure_time}{" "}<br />
        //                 Landing Time : {flight.landing_time}{" "}<br />
        //                 Remaining Tickets : {flight.remaining_tickets}{" "}<br />
        //                 <button onClick={() => delflight(flight.id)}>Cancel Flight</button>
        //             </div>) : null}
        //         </div>}
        // </div>
        <div >
        <Row > 
        {flights.length > 0 ? flights.length > 0  && flights
            .map((flight, i) => (<div key={i}>
                <Card>
                    <Card.Header>Featured</Card.Header>
                    <Card.Body>
                        <Card.Title>From {flight.origin_country} To {flight.destination_country}</Card.Title>
                        <Card.Text>
                            <Image className="posrightairline" src={`../../assets/${flight.destination_country}.jpg`}></Image>
                            Departure from {flight.origin_country} at {flight.departure_time} <br></br>
                            Arrival to {flight.destination_country} at {flight.landing_time} <br></br>
                            <button onClick={() => delflight(flight.id)}>Cancel Flight</button>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>)): null }
</Row>
</div>
    )
}

export default AirlineFlights