import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../general/base/AuthContext";
import axios from "axios";

function Dashboard() {
    let {user,authTokens, logoutUser} = useContext(AuthContext)
    
    let history = useHistory();

    const[profiles, setProfiles] = useState([]);

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('');
    
    const[my, setMy] = useState({});

    useEffect(()=> {
        GetProfiles()
    }, [])
    
    
    let GetProfiles = async() =>{
        let response = await fetch('http://127.0.0.1:8000/api/users-profile/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                //'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
    
        if(response.status === 200){
            setProfiles(data)
        }//else if(response.statusText === 'Unauthorized'){
            //logoutUser()
        //}
    }

    const my_id=0;

   
/////
    const UpdateAccount = async () => {
        let formField = new FormData()

        await axios({
          method: 'post',
          url:`http://127.0.0.1:8000/api/users-profile/${my_id}`,
          data: formField
        }).then(response=>{
          console.log(response.data);
          setMy(response.data)
         // history.push('/')
        })
    }

    return(
        <div>
            <h1>Hello, {user.username}</h1>
            <h2>this is your dashboard</h2>
            <h2>{user.info.description}!</h2>
            <h2>{user.info.favorite_team}!</h2>
        </div>
    )
}

export default Dashboard;