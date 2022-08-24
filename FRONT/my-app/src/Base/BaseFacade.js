import React from 'react'
import FlightByPar from './FlightByPar'
import MyDep from './MyDep'
import Myflights from './MyflightsCard1'
import MyRegister from './MyRegister'
import MyCountries from './MyCountries'
import MyAirlines from './MyAirlines'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const BaseFacade = () => {
  return (
    <div>
      <Button><Link to="/baseflights">Flights</Link>{""}</Button>
      <Button><Link to="/flightpar">Find Flight By Date and Destination</Link>{""}</Button>
      <Button><Link to="/baseairlines">Airlines</Link>{""}</Button>
      <Button><Link to="/basecountries">Countries</Link>{""}</Button>
      <Button><Link to="/basedepartures">Departures</Link>{""}</Button>
    </div>
  )
}

export default BaseFacade

const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;