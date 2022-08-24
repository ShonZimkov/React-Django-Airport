import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Card, Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import BaseFacade from './BaseFacade';


const FlightByPar = () => {
    const [flightPar, setflightPar] = useState([])
    const [origin, setorigin] = useState("")
    const [destination, setdestination] = useState("")
    const [date, setdate] = useState("")

    const getflightPar = async (origin,destination,date) => {
        await axios.get(`http://127.0.0.1:8000/flightpar/${origin}/${destination}/${date} `).
            then(function (response) {
                console.log(response.data)
                setflightPar(response.data)
                // console.log(jwt_decode(localStorage.getItem("access")))
            })
            .catch(function (error) {
                console.log(error);
            });
    }
  return (
    <div>
        <BaseFacade/>
        Origin (ID):<input onChange={(e) => setorigin(e.target.value)} />
        Destination (ID):<input onChange={(e) => setdestination(e.target.value)} />
        Date:<input onChange={(e) => setdate(e.target.value)} />
        <button onClick={() => getflightPar(origin,destination,date)}>Flight By Par</button><br></br>
        <br></br>
        <Row xs={1} md={6} className="g-4">
                {flightPar.length > 0  &&flightPar.map((flight, idx) => (
                    <Col>
                        <Card key={idx}>
                            <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/assets/${flight.destination_country}.jpg`}  />
                            <Card.Body>
                                <Card.Title>From {flight.origin_country} To {flight.destination_country}</Card.Title>
                                <Card.Text>
                                    Airline : {flight.airline_company}{" "}
                                    Departure Time : {flight.departure_time}{" "}
                                    Landing Time : {flight.landing_time}{" "}
                                    Tickets Remaining : {flight.remaining_tickets}  {" "}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
    </div>
  )
}

export default FlightByPar