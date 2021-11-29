import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

    
function Reg(){  
    
    const[password, setPassword] = useState('');
    const[Dpassword, setDPassword] = useState('');
    const[email, setEmail] = useState('');
    const[Demail, setDEmail] = useState('');

    const emHand = (e) => {
        setEmail(e.target.value)
    }

    const pasHand = (e) => {
        setPassword(e.target.value)
    }
    
    return (  
      <div>  
        <h3>Controlled Component</h3>  
        <br />  
        <form>  
          <h1>registration</h1> 
          <input onChange={e=>emHand(e)} value={email} type="text" placeholder="enter em" />
          <input value={password} type="text" placeholder="enter pas" />
        <button type='submit'></button>
        </form>  
      </div>  
    );  
  }  
  
export default Reg; 