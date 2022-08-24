import React from 'react'
import { Button, Card, Col, Container, Row ,Image} from 'react-bootstrap'
import '../App.css';
import FlightBooking from './FlightBooking'
import FlightsearchDis from './FlightsearchDis';
import { useSelector } from "react-redux";
import {selectAllCountries} from "./SearchSlice";
import CardGroup from 'react-bootstrap/CardGroup';


const Header = () => {
    const populardestinations = useSelector(selectAllCountries)
    return (
        <div>
            <Container fluid >
                <Row  style={{ backgroundImage: `url(${'../../assets/Flight.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <Col sm={5}>
                    </Col>
                    <Col sm={6}>
                        <FlightBooking > </FlightBooking>
                    </Col>
                </Row>
                <Row>
                    <FlightsearchDis></FlightsearchDis>
                </Row>
                <Row style={{marginTop : '50px'}}>
                    <Card className='d-flex flex-row fw-bold text-center bg-danger border-5 rounded-pill text-white my-5 py-4 '>
                        <Card.Body >
                            <li>Choose From Various Locations</li><li>Buy Fast and Cheap!</li>
                        </Card.Body>
                    </Card>
                </Row>
                <Row style={{marginTop : '100px'}}>
                    <center><h1>Popular Destinations</h1>  </center>
                    <div style={{display:'flex' , flexWrap:'wrap',marginTop: '100px'}}>
                {populardestinations
                        .map((country, i) => (
                        
                            <Card key={i} style={{ width: '40em' ,flex: '1 0 21%'}} className='m-2'>
                            <Image style={{height:'250px'}}  src={`../../assets/${country.name}.jpg`}></Image>
                                <Card.Body>
                                    <Card.Title>Serach Flights To {country.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                                    <Card.Text>
                                        {country.name} is so beatiful because... <br></br>
                                        exolore the unique culture of {country.name} <br></br>
                                        enjoy various attractions 
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                          </div>
                        
                      
                </Row>
            </Container>
        </div>
    )
}

export default Header

