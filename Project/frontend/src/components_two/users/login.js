import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";



const LogIn = () => {

    let history = useHistory();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('');
    

    const Add = async () => {
        let formField = new FormData()
        formField.append('username',username)
        formField.append('password',password)

        await axios({
          method: 'post',
          url:'http://127.0.0.1:8000/auth/token/login/',
          data: formField
        }).then(response=>{
          console.log(response.data);
          localStorage.setItem('auth_token',response.data.auth_token)
          history.push('/')
        })
    }
   
    return (
        <div className="container">
            <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">login</h2>
        
        <div className="form-group">
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary btn-block" onClick={Add}>login</button>
          <p>don't have an account? <Link to={`/reg`}>sign up</Link> </p>
       
      </div>
    </div>
        </div>
    );
};

export default LogIn;
