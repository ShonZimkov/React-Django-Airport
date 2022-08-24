import React, { useState , useEffect } from "react";
import { Card, Col, Row, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { selectAllFligths, selectData, selectsearched } from "./SearchSlice";
import Button from 'react-bootstrap/Button';
import { FaBuyNLarge } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { buydata } from "./BuySlice";

const FlightsearchDis = () => {
    const dispatch = useDispatch();
    const searched = useSelector(selectsearched)
    const data = useSelector(selectData)
    const allflights = useSelector(selectAllFligths)
    const depflights = allflights.filter(x => x.origin_country === data.departure && x.destination_country === data.arrival && x.departure_time.includes(data.departureDate) && data.departureDate !== '')
    const arrivalflights = allflights.filter(x => x.origin_country === data.arrival && x.destination_country === data.departure && x.departure_time.includes(data.returnDate) && data.returnDate !== '')
    const test = allflights.filter(x => x.id === 1)
    let price = Math.floor(Math.random()*(5000 - 1000 +1))+1000

    let navigate = useNavigate(); 
      const routeChange = (flight) =>{ 
        dispatch(buydata(flight))
        console.log(flight)
        localStorage.setItem('price',price)
        console.log(price)
        let path = `/buy`; 
        navigate(path);
        
      }
     

    return (
        <div className="mt-5">
            <Row>
                <Col sm={6}>
                    {searched && <div>
                        {data.departureDate !== '' ? <div>
                            {depflights.length > 0 ? <div>
                                <center><h1>Flight:</h1></center>
                                {depflights
                                    .map((flight, i) => (<div key={i}>
                                        <Card>
                                            <Card.Header>Featured</Card.Header>
                                            <Card.Body>
                                                
                                                <Card.Title>From {flight.origin_country} To {flight.destination_country}</Card.Title>
                                                <Card.Text>
                                                <Image className="posright" src={`../../assets/${flight.destination_country}.jpg`}></Image>
                                                    Departure from {flight.origin_country} at {flight.departure_time} <br></br>
                                                    Arrival to {flight.destination_country} at {flight.landing_time}
                                                </Card.Text>
                                                <h4>{price}$</h4> <Button variant="success" onClick={()=>routeChange(flight)}>Buy Now</Button>
                                            </Card.Body>
                                        </Card>
                                    </div>))}</div> : <div> <center><h3>no flights at this date and to that destination</h3></center></div>}</div> : <div><center><h2>please pick a departure date</h2></center></div>}</div>}
                </Col>
                <Col sm={5}>
                    {searched && <div>
                        {data.returnDate !== '' ? <div>
                            {arrivalflights.length > 0 ? <div>
                                <center><h1>Return:</h1></center>
                                {arrivalflights
                                    .map((flight, i) => (<div key={i}>
                                        
                                        <Card>
                                            <Card.Header>Featured</Card.Header>
                                            <Card.Body>
                                                <Image className="posright" src={`../../assets/${flight.destination_country}.jpg`}></Image>
                                                <Card.Title>From {flight.origin_country} To {flight.destination_country}</Card.Title>
                                                <Card.Text>
                                                    Departure from {flight.origin_country} at {flight.departure_time} <br></br>
                                                    Arrival to {flight.destination_country} at {flight.landing_time}
                                                </Card.Text>
                                                <h4>{price}$</h4><Button variant="success" onClick={()=>routeChange(flight)}>Buy Now</Button>
                                            </Card.Body>
                                        </Card>
                                    </div>))}</div> : <div><center><h3>no flights Back at this date and to that destination </h3></center></div>}</div> : <div><center><h2>please pick a return date</h2></center></div>}</div>}
                </Col>
            </Row>
        </div>
    )
}
export default FlightsearchDis