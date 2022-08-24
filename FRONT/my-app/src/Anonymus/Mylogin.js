import React, { useState } from "react"
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import {loginslice,selectLog} from "../Anonymus/LogSlice";
import '../App.css';
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";


const MyLogin = () => {
    const [user, setuser] = useState("")
    const [pwd, setpwd] = useState("")
    let [authMode, setAuthMode] = useState("signin")
    const DJANGO = 'http://127.0.0.1:8000/token/'
    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
      }

    let navigate = useNavigate(); 
      const routeChange = () =>{ 
        let path = `/`; 
        navigate(path);
      }

    const login = async () => {
        await axios.post(DJANGO, {
            username: user,
            password: pwd
        })
            .then(function (response) {
                console.log(response.data.access);
                console.log(jwtDecode(response.data.access))
                localStorage.setItem("access", response.data.access)
            })
            .catch(function (error) {
                console.log(error);
            });
            axios.get('http://127.0.0.1:8000/getauth',{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access")}`
                },
            }).
            then(function (response) {
                localStorage.setItem("auth", response.data.Auth)
                console.log(response.data.Auth)
                dispatch(loginslice())
                routeChange()
            })
    }
    
    // register
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")

    const adduser = async () => {
        await axios.post(`http://127.0.0.1:8000/adduser   `, {
            "username": username,
            "password":password,
            "email":email
        })

            .then(function (response) {
                console.log(response);
                changeAuthMode()
            })
            .catch(function (error) {
                console.log(error);
            });
            

    }
    
    const dispatch = useDispatch();

    if (authMode === "signin") {
        return (
          <div style={{ backgroundImage: `url(${'../../assets/planeLog.jpeg'})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="Auth-form-container">
            <div className="Auth-form">
              <div className="Auth-form-content">
                <h3 className="Auth-form-title">Sign In</h3>
                <div className="text-center">
                  Not registered yet?{" "}
                  <span className="link-primary" onClick={changeAuthMode}>
                    Sign Up
                  </span>
                </div>
                <div className="form-group mt-3">
                  <label>Username</label>
                  <input
                    className="form-control mt-1"
                    placeholder="Enter Username"
                    onChange={(e) => setuser(e.target.value)}
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                    onChange={(e) => setpwd(e.target.value)}
                  />
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button onClick={() => login()} className="btn btn-outline-danger">Sign in</button>              
                </div>
              </div>
            </div>
          </div>
        )
      }
    
      return (
         <div style={{ backgroundImage: `url(${'../../assets/planeLog.jpeg'})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="Auth-form-container">
          <div className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign Up</h3>
              <div className="text-center">
                Already registered?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign In
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Username</label>
                <input
                  className="form-control mt-1"
                  placeholder="Username"
                  onChange={(e) => setusername(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Email Address"
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Password"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button onClick={()=>adduser()} className="btn btn-outline-danger">
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
        
    )
    }




export default MyLogin



