import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import BaseFacade from './BaseFacade'
import Table from 'react-bootstrap/Table';
import {Image } from 'react-bootstrap'

const Myflights = () => {
    const [airlines, setairline] = useState([])
    const [hidden, setHidden] = useState(false);
    const [AirlineID, setAirlineID] = useState("")
    const [airlinebyid, setairlinebyid] = useState([])

    useEffect(() => {
        getairline()

    }, [])


    const getairline = async () => {
        setHidden(!hidden)
        axios.get('http://127.0.0.1:8000/getair_companies    ').
            then(function (response) {
                console.log(response.data);
                setairline(response.data)
                // console.log(jwt_decode(localStorage.getItem("access")))
            })
            .catch(function (error) {
                console.log(error);


            });
    }


    const getairlineID = async (id) => {

        await axios.get(`http://127.0.0.1:8000/getflights/${id} `).
            then(function (response) {
                console.log(response.data)
                setairlinebyid(response.data)
                // console.log(jwt_decode(localStorage.getItem("access")))
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        // <div>
        //     <BaseFacade/>
        //     <button onClick={() => getairline()}>Airlines</button>
        //     {<div>
        //         {hidden  && airlines.map((airline, ind) => <div key={ind}>
        //             ID : {airline.id} {" "}\
        //             Airline : {airline.name}{" "}\
        //             Country : {airline.country}{" "}<br></br>
        //         </div>) }
        //         Airline ID:<input onChange={(e) => setAirlineID(e.target.value)} />
        //         <button onClick={() => getairlineID(AirlineID)}>Airline By ID</button><br></br>
        //             {AirlineID !== "" && 
        //             <div>
        //             ID : {airlinebyid.id} {" "}\
        //             Airline : {airlinebyid.airline_company}{" "}\
        //             Country : {airlinebyid.origin_country}{" "}<br></br>
        //             </div>}
        //     </div>}
        // </div>
        <div>
            < Table striped bordered hover >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Company Name</th>
                        <th>Country</th>
                    </tr>
                    </thead>


                {airlines.map((airline, ind) => 
                <thead>
                            <tr key={ind}>
                                <th>{airline.id}</th>
                                <th>{airline.name}</th>
                                <th>{airline.country} <Image  className="posrightsmall" src={`../../assets/${airline.country}flag.jpg`}></Image></th>
                            </tr>
                            </thead>
            )}
            </Table >
        </div>
    )
}

export default Myflights