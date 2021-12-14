import React, {useState, useEffect} from 'react';
import axios from 'axios';
//import './Model.css';
import {Link} from 'react-router-dom';
function Players() {

    const [players, setPlayers] = useState([]);

    useEffect( () => {
        axios({
            method:"GET",
            url:"http://127.0.0.1:8000/api/players/",
            mode: "no-cors"
        }).then(response => {
            setPlayers(response.data)
        })
    },[])
    return(
        <div>
            <h1>Players page</h1>
            <h2>list of players</h2>
                <hr/>      
                {players.map(item => (
                    <div>
                    <h1 key={item.id}>
                        <Link to={{ pathname: `/players/${item.id}/`, fromDashboard: false}}>
                            {item.name}<br/>
                        </Link>
                    </h1>
                    </div>
                    ))}
                </div>)
                }

export default Players;
