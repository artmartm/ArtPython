import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";


const SignUp = () => {

    let history = useHistory();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    

    const Add = async () => {
        let formField = new FormData()
        formField.append('username',username)
        formField.append('password',password)
        formField.append('email',email)

        await axios({
          method: 'post',
          url:'http://127.0.0.1:8000/auth/users/',
          data: formField
        }).then(response=>{
          console.log(response.data);
          history.push('/')
        })
    }
   
    return (
        <div className="container">
          <div class="main-signin">
		<div class="main-signin__head">
			<p>SIGNUP</p>
		</div>
		<div class="main-signin__middle">
			<div class="middle__form">
      <input type="text" placeholder="name" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input type="text" placeholder="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" placeholder="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <input type="submit" placeholder="login" onClick={Add}/>

			</div>
		</div>
		<div class="main-signin__foot">
			<div class="foot__left">
				<p>through:</p>
			</div>
			<div class="foot__right">
				<div class="twit"><a href="#"></a></div>
				<div class="face"><a href="#"></a></div>
			</div>
		</div>
	</div>
          <p>already have an account? <Link to={`/login`}>login</Link> </p>
       
      </div>
    );
};

export default SignUp;


