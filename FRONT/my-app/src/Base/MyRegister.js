import React from 'react'
import { useState } from 'react'
import axios from 'axios'


const MyRegister = () => {
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
                // setticket()
            })
            .catch(function (error) {
                console.log(error);
            });

    }
  return (
    <div>Register<br></br>
    Username:<input onChange={(e) => setusername(e.target.value)} />
    Password:<input onChange={(e) => setpassword(e.target.value)} type="password" />
    Email:<input onChange={(e) => setemail(e.target.value)} />
    <button onClick={() => adduser()}>Register</button><br></br>
    </div>
  )
}

export default MyRegister