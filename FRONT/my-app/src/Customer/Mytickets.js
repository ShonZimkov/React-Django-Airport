import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Table from 'react-bootstrap/Table';
import {  Image } from 'react-bootstrap'

const Mytickets = () => {
    const [hidden, setHidden] = useState(false);
    const [tickets, setticket] = useState([])
    const [flight, setflight] = useState([])
    // const res = flight.filter(x => x.id === ticket.flight_id)

    useEffect(() => {
        getticket()
    }, [])
    

    const getticket = async () => {
        setHidden(!hidden)
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("access")}`
        };
        axios.get(`http://127.0.0.1:8000/cust_ticket   `, { headers }).
            then(function (response) {
                // console.log(response.data);
                setticket(response.data)
                getflight()
                // getflightID(response.data.flight_id)
                // console.log(jwt_decode(localStorage.getItem("access")))
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const getflight = async () => {
        setHidden(!hidden)
        axios.get('http://127.0.0.1:8000/getflights    ').
            then(function (response) {
                setflight(response.data)
            })
            .catch(function (error) {
                console.log(error);


            });

    }

    const delticket = async (id) => {
        console.log(id)
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("access")}`
        };
        axios.delete(`http://127.0.0.1:8000/delticket/${id}   `,{headers})
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
        //     <center><button style={{ marginTop: '50px' }} onClick={() => getticket()} className='btn btn-primary'>My Tickets</button></center>
        //     {<div style={{
        //             width: "100%",
        //             display: "flex",
        //             flexWrap: "wrap",
        //             justifyContent: "space-around",
        //             backgroundColor:'white'
        //         }}>
        //         {hidden && tickets.length > 0 ? tickets.map((ticket, ind) => <div className='col-4' key={ind}>
        //             ID : {ticket.id} {" "}<br />
        //             Flight ID : {ticket.flight_id}{" "}<br />
        //             Customer : {ticket.customer}{" "}<br />
        //             Amount of tickets: {ticket.amount}{''}<br/>
        //             <button onClick={()=>delticket(ticket.flight_id)}>Cancel Flight</button>
        //         </div>) : null}
        //     </div>}
        // </div>
        <div>
        < Table striped bordered hover >
            <thead>
                <tr>
                    <th>Ticket ID</th>
                    <th>Flight ID</th>
                    <th>Customer</th>
                    <th>Amount of tickets</th>
                    <th>Destination</th>
                </tr>
                </thead>


            {tickets.length > 0 ? tickets.map((ticket, ind) => 
            <thead key={ind}>
                    {flight.filter(x => x.id === ticket.flight_id).map(res =>
                        <tr >
                            <th>{ticket.id}</th>
                            <th>{ticket.flight_id}</th>
                            <th>{ticket.customer}</th>
                            <th>{ticket.amount}</th>
                            <th>{res.destination_country}   <Image  className="posrightsmall" src={`../../assets/${res.destination_country}flag.jpg`}></Image></th>
                            {/* <th>{flightbyid.destination_country} <Image  className="posrightsmall" src={`../../assets/${flightbyid.destination_country}flag.jpg`}></Image></th> */}
                            <th><button onClick={()=>delticket(ticket.flight_id)}>Cancel Flight</button></th>
                        </tr>)}
                        </thead>
        ) : null}
        </Table >
    </div>
    )
}

export default Mytickets