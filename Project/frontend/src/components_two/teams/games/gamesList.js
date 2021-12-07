import React, {useState, useEffect} from 'react';
import axios from 'axios';
//import '../../Model.css';
import {Link} from 'react-router-dom';
function Games() {

    const [games, setGames] = useState([]);

    useEffect( () => {
        axios({
            method:"GET",
            url:"http://127.0.0.1:8000/api/games/",
            mode: "no-cors"
        }).then(response => {
            setGames(response.data)
        })
    },[])
    return(
        <div>
            <h1>Games page</h1>
            <hr/>      
                <hr/>      
                {games.map(item => (
                    <div>
                    <h1 key={item.id}>
                        <Link to={{ pathname: `/game/${item.id}/`, fromDashboard: false}}>
                            {item.name}<br/>
                        </Link>
                    </h1>
                    </div>
                    ))}
                </div>)
                }

export default Games;
