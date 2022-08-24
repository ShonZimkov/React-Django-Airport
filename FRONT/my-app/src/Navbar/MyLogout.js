import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import {logoutslice, logout,selectLog} from "../Anonymus/LogSlice";
import {resetcust} from '../components/BuySlice';

const MyLogout = () => {

    localStorage.setItem("access","")
    localStorage.setItem("auth","")
    const dispatch = useDispatch();
    dispatch(logoutslice())
    

  return (
    <div style={{ backgroundImage: `url(${'../../assets/planeOut.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center',height:'700px' }}>
        <center><h1>Logged out</h1></center>
    </div>
  )
}

export default MyLogout