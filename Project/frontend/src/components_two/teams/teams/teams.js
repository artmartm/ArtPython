import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
//import '../Model.css';
import {Link} from 'react-router-dom';
//import AuthContext from '../../../components/pages/authContext';


function Teams() {

    let tok = localStorage.getItem('auth_token');
    let l = '99276f25482a71de3baa2a6d76b6fb7680e478d5';
    const [teams, setTeams] = useState([]);


    {/*let {authTokens, logoutUser} = useContext(AuthContext);
    
   useEffect(()=>{
        getTeams()
    },[])
    
    let getTeams = async()=>{
        let response = await fetch('http://127.0.0.1:8000/api/teams/', {
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+String(authTokens.access)
            }
        })
        let data = await response.json()
        if(response.status) {
            setTeams(data)
        } else if (response.statusText === 'Unauthorized') {
            logoutUser()
        }
    } */}

                {/*headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+String(authTokens.access)
            }*/}
        useEffect( () => {
        axios({
            method:"GET",
            url:"http://127.0.0.1:8000/api/teams/",
            mode: "no-cors",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${tok}`
              },
        }).then(response => {
            setTeams(response.data)
        })
    },[])


    return(
        <div>
            <h1>Teams page</h1>
            <h2>!{tok}</h2>
            <h2>country</h2>
            <hr/>      
                <hr/>      
                {teams.map(item => (
                    <div>
                    <h1 key={item.id}>
                        <Link to={{ pathname: `/teams/${item.id}/`, fromDashboard: false}}>
                            {item.name}<br/>
                        </Link>
                    </h1>
                    </div>
                    ))}
                </div>)
                }

export default Teams;
