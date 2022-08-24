import React from 'react'
import AddFlight from './AddFlight'
import AirlineFlights from './AirlineFlights'
import UpAirline from './UpAirline'
import UpFlight from './UpFlight'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const AirlineFacade = () => {
  return (
    <div>
      <Button><Link to="/addflight">Add Flight</Link>{""}</Button>
      <Button><Link to="/airlineflights">Airline Flights</Link>{""}</Button>
      <Button><Link to="/upairline">Update Airline</Link>{""}</Button>
      <Button><Link to="/upflight">Update Flight</Link>{""}</Button>
      
    </div>
  )
}

export default AirlineFacade

const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;