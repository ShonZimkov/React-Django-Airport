import React ,{useEffect} from 'react'
import { useState } from 'react'
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { Card, Col, Row, Image } from 'react-bootstrap'
import BaseFacade from './BaseFacade';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../App.css';
import { useSelector, useDispatch } from "react-redux";
import { buydata } from "../components/BuySlice";
import {ticketsdata} from '../components/BuySlice';
import Moment from 'moment';


const Myflights = () => {
    const [flights, setflight] = useState([])
    const [hidden, setHidden] = useState(false);
    const [ticket, setticket] = useState(0);
    const [FlightID, setFlightID] = useState("")
    const [flightbyid, setflightbyid] = useState([])
    const [customer, setcustomer] = useState("")
    const dispatch = useDispatch();

    useEffect(() => {
        getflight()
    }, [])
    

    let price = Math.floor(Math.random()*(5000 - 1000 +1))+1000

    let navigate = useNavigate(); 
      const routeChange = (flight) =>{ 
        console.log('here')
        dispatch(ticketsdata(''))
        dispatch(buydata(flight))
        localStorage.setItem('price',price)
        let path = `/buy`; 
        navigate(path);
        
      }


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
        // <div>
        //     <BaseFacade/>
        //     <button onClick={() => getflight()}>Flights</button>
        //     {<div>
        //         {hidden && <Row xs={1} md={6} className="g-4">
        //         {flights.map((flight, idx) => (
        //             <Col>
        //                 <Card key={idx}>
        //                     <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/assets/${flight.destination_country}.jpg`}  />
        //                     <Card.Body>
        //                         <Card.Title>From {flight.origin_country} To {flight.destination_country}</Card.Title>
        //                         <Card.Text>
        //                             Airline : {flight.airline_company}{" "}<br></br>
        //                             Departure Time : {flight.departure_time}{" "}<br></br>
        //                             Landing Time : {flight.landing_time}{" "}<br></br>
        //                             Tickets Remaining : {flight.remaining_tickets}  {" "}
        //                             {hidden && customer === "access" && <button onClick={() => setticket(flight.id)}>Buy Ticket</button>}
        //                         </Card.Text>
        //                     </Card.Body>
        //                 </Card>
        //             </Col>
        //         ))}
        //     </Row>}

        //         {hidden && ticket > 0 && <div><br></br>
        //             Flight No : {ticket} Press Confirm to Buy<br></br>
        //             <button onClick={() => addticket()}>Confirm Buy</button></div>}
        //         Flight ID:<input onChange={(e) => setFlightID(e.target.value)} />
        //         <button onClick={() => getflightID(FlightID)}>Flight By ID</button><br></br>
        //         {FlightID !== "" &&
        //             <Row xs={1} md={6} className="g-4">
        //                 <Col>
        //                     <Card>
        //                         <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/assets/${flightbyid.destination_country}.jpg`}  />
        //                         <Card.Body>
        //                             <Card.Title>From {flightbyid.origin_country} To {flightbyid.destination_country}</Card.Title>
        //                             <Card.Text>
        //                                 Airline : {flightbyid.airline_company}{" "}
        //                                 Departure Time : {flightbyid.departure_time}{" "}
        //                                 Landing Time : {flightbyid.landing_time}{" "}
        //                                 Tickets Remaining : {flightbyid.remaining_tickets}  {" "}
        //                                 {hidden && customer === "access" && <button onClick={() => setticket(flightbyid.id)}>Buy Ticket</button>}
        //                             </Card.Text>
        //                         </Card.Body>
        //                     </Card>
        //                 </Col>
        //         </Row>}
        //     </div>}
        // </div>
        <div >
                    <Row > 
                    {flights.length > 0  && flights
                        .map((flight, i) => (<div key={i}>
                            <Card>
                                <Card.Header>{flight.id}</Card.Header>
                                <Card.Body>
                                    <Card.Title>From {flight.origin_country} To {flight.destination_country}</Card.Title>
                                    <Card.Text>
                                        <Image className="posrightall" src={`../../assets/${flight.destination_country}.jpg`}></Image>
                                        Departure from {flight.origin_country} at {flight.departure_time} <br></br>
                                        Arrival to {flight.destination_country} at {flight.landing_time} <br></br>
                                        
                                    </Card.Text>
                                    <h4>{price}$</h4> <Button variant="success" onClick={()=>routeChange(flight)}>Buy Now</Button>
                                </Card.Body>
                            </Card>
                        </div>))}
            </Row>
        </div>
    )
} 

export default Myflights