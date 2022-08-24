import React, { useEffect, useState } from 'react'
import { Form, Label } from 'semantic-ui-react';
import { useSelector, useDispatch } from "react-redux";
import { getCustAsync, selectbuy , selectCust, selectTicket} from './BuySlice';
import axios from 'axios';
import {  selectLog } from '../Anonymus/LogSlice';

const BuyPage = () => {
    const buydata = useSelector(selectbuy)
    const cust = useSelector(selectCust)
    const log = useSelector(selectLog)
    const dispatch = useDispatch();
    const price = localStorage.getItem('price') 
    const ticketsbought = useSelector(selectTicket)
    const ticketsafter = buydata.remaining_tickets - ticketsbought
    const [option, setoption] = useState(1)

    useEffect(() => {
        // call api or anything
        dispatch(getCustAsync())

     },[]);


     const uptickets = async (id) => {
        await axios.put(`http://127.0.0.1:8000/uptickets/${id}   `, {
            "remaining_tickets": ticketsafter
        })
            .then(function (response) {
                console.log(response);
                // console.log(ticketsafter)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const addticket = async (id) => {
        await axios.post(`http://127.0.0.1:8000/addticket   `, {
            "flight_id": id,
            'amount' : ticketsbought !=="" ? ticketsbought : option
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access")}`
            },
        })

            .then(function (response) {
                console.log(response);
                uptickets(id)
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    return (
        
        <div style={{ backgroundImage: `url(${'../../assets/planeLog.jpeg'})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="Auth-form-container">
        <div className="Auth-form">
            <div className="Auth-form-content m-3 text-center">
               {log ? <div>Flight From {buydata.origin_country} To {buydata.destination_country} <br></br>
                Departure Time : {buydata.departure_time} <br></br>
                Landing Time : {buydata.landing_time} <br></br>
                Remaining Tickets : {buydata.remaining_tickets} <br></br>
                Number of Tickets : {ticketsbought === '' ? <select  onChange={(e) => setoption(e.target.value)}>
                    <option >1</option>
                    <option >2</option>
                    <option >3</option>
                </select> : ticketsbought }
                {/* {price}$ */}<hr></hr>
                Name : {cust.first_name}  {cust.last_name} <br></br>  
                Adress : {cust.address} <br></br>
                Phone Number : {cust.phone_no} <br></br>
                Credit Card to Use : {cust.credit_card_no} 
                <hr></hr>
                {ticketsbought === '' ? <div>Price : ${option} * ${price}$  <hr></hr>
                ${option*price}$ <br></br><br></br></div> : 
                <div>Price : ${ticketsbought} * ${price}$  <hr></hr>
                ${ticketsbought*price}$ <br></br><br></br></div>
                }
                <button onClick={()=>addticket(buydata.id)}>Buy Ticket</button> </div>: <h1>You Are not Logged in , Log in and make a Customer Profile to purchase Tickets</h1>}

            </div>
        </div>
    </div>
    )
}

export default BuyPage