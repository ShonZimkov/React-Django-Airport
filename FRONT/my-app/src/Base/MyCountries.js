import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import BaseFacade from './BaseFacade'
import { Card, Col, Row, Image } from 'react-bootstrap'
import CardGroup from 'react-bootstrap/CardGroup';

const Myflights = () => {
    const [countries, setcountry] = useState([])
    const [hidden, setHidden] = useState(false);
    const [countryID, setcountryID] = useState("")
    const [countrybyid, setcountrybyid] = useState([])

    useEffect(() => {
        getcountry()
      
    }, [])
    

    const getcountry = async () => {
        setHidden(!hidden)
        axios.get('http://127.0.0.1:8000/countries    ').
            then(function (response) {
                console.log(response.data);
                setcountry(response.data)
                // console.log(jwt_decode(localStorage.getItem("access")))
            })
            .catch(function (error) {
                console.log(error);


            });
    }


    const getcountryID = async (id) => {
        
        await axios.get(`http://127.0.0.1:8000/countries/${id} `).
            then(function (response) {
                setcountrybyid(response.data)
                // console.log(jwt_decode(localStorage.getItem("access")))
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        // <div>
        //     <BaseFacade/>
        //     <button onClick={() => getcountry()}>Countries</button>
        //     {<div>
        //         {hidden  && countries.map((country, ind) => <div key={ind}>
        //             ID : {country.id} {" "}\
        //             Name : {country.name}{" "}
        //         </div>) }
        //         Country ID:<input onChange={(e) => setcountryID(e.target.value)} />
        //         <button onClick={() => getcountryID(countryID)}>Country By ID</button><br></br>
        //             {countryID !== "" && 
        //             <div>
        //             ID : {countrybyid.id} {" "}\
        //             Name : {countrybyid.name}{" "}
        //             </div>}
        //     </div>}
        // </div>
        
        
       <div style={{display:'flex' , flexWrap:'wrap'}}>
        
      {countries.map((country,i)=>
        <Card key={i} className='m-2' style={{ width: '20em' ,flex: '1 0 21%'}}>
        <Card.Img variant="top" src={`../../assets/${country.name}.jpg`} style={{height:"250px"}} />
        <Card.Body>
          <Card.Title>{country.name}</Card.Title>
          <Card.Text>
            Visit {country.name}'s Famous Sites
            Explore the tradition 
            Enjoy in the Museums 
          </Card.Text>
        </Card.Body>
        <Card.Footer>
        </Card.Footer>
      </Card>)}

      </div>
    
    )
}

export default Myflights