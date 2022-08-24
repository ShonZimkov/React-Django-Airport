import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Myflights from './MyflightsCard1'
import BaseFacade from './BaseFacade'
import { Button, Card,  Row ,Image} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { buydata } from "../components/BuySlice";
import {ticketsdata} from '../components/BuySlice';


const MyDep = () => {
    const [dep, setdep] = useState([])
    const [hidden, setHidden] = useState(1);
    const price = localStorage.getItem('price') 
    const dispatch = useDispatch();

    useEffect(() => {
        getdep()
    }, [])
    
    let navigate = useNavigate(); 
      const routeChange = (flight) =>{ 
        console.log('here')
        dispatch(ticketsdata(''))
        dispatch(buydata(flight))
        localStorage.setItem('price',price)
        let path = `/buy`; 
        navigate(path);
        
      }

    const getdep = async () => {
        setHidden(hidden + 1)
        
        axios.get(`http://127.0.0.1:8000/departure   `).
            then(function (response) {
                console.log(response.data);
                setdep(response.data)
                // console.log(jwt_decode(localStorage.getItem("access")))
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
   
    return (


        // <div>
        //     <BaseFacade/>
        //     <button onClick={() => getdep()}>Departured Flights</button>
        //     {<div>
        //         {hidden % 2 === 0 && dep.length >0 ? dep.map((dep, ind) => <div key={ind}>
        //             ID : {dep.id} {" "}<br />
        //             Airline : {dep.airline_company}{" "}<br />
        //             Origin Country : {dep.origin_country}{" "}<br />
        //             Destination Country : {dep.destination_country}{" "}<br />
        //             Departure Time : {dep.departure_time}{" "}<br />
        //             Landing Time : {dep.landing_time}{" "}<br />
        //             Tickets Remaining : {dep.remaining_tickets}{" "}<br></br>
                    
        //         </div>) : null}
                
        //     </div>}
        // </div>
        <Row > 
        {dep.length > 0  ? dep
            .map((dep, i) => (<div key={i}>
                <Card>
                    <Card.Header>Featured</Card.Header>
                    <Card.Body>
                        <Card.Title>From {dep.origin_country} To {dep.destination_country}</Card.Title>
                        <Card.Text>
                            <Image className="posrightall" src={`../../assets/${dep.destination_country}.jpg`}></Image>
                            Departure from {dep.origin_country} at {dep.departure_time} <br></br>
                            Arrival to {dep.destination_country} at {dep.landing_time}
                        </Card.Text>
                        <h4>{price}$</h4> <Button variant="success" onClick={()=>routeChange(dep)}>Buy Now</Button>
                    </Card.Body>
                </Card>
            </div>)):<div style={{ backgroundImage: `url(${'../../assets/Flight.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center',height:'700px' }}>
            <center className='mt-5'><h1>No Flights departuring in 12 Hours</h1></center></div>}
</Row>
    )
}

export default MyDep