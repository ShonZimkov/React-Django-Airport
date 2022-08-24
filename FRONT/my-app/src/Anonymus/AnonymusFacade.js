import React, { useState  } from 'react'
import AddCustomer from './AddCustomer'
import MyLogin from './Mylogin'
import { useSelector } from 'react-redux';
import LogData from './LogData';
import {  selectLog } from "./LogSlice";
import BaseFacade from '../Base/BaseFacade';

const AnonymusFacade = () => {
    const log = useSelector(selectLog)
  return (
    <div>
      <BaseFacade/>
    </div>
  )
}

export default AnonymusFacade