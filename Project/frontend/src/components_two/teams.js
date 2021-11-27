import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Model.css';
import {Link} from 'react-router-dom';
function Teams() {

    const [teams, setTeams] = useState([]);

    useEffect( () => {
        axios({
            method:"GET",
            url:"http://127.0.0.1:8000/api/team/",
            mode: "no-cors"
        }).then(response => {
            setTeams(response.data)
        })
    },[])
    return(
        <div>
            <h1>Teams page</h1>
            <h2>country</h2>
                <hr/>      
                {teams.map(item => (
                    <div>
                    <h1 key={item.id}>
                        <Link to={{ pathname: `/team/${item.id}/`, fromDashboard: false}}>
                            {item.name}<br/>
                        </Link>
                    </h1>
                    </div>
                    ))}
                </div>)
                }

export default Teams;