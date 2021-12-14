import React, {useState, useEffect} from 'react';
import axios from 'axios';
//import '../../Model.css';
import {Link} from 'react-router-dom';
import TeamLogo from '../teams/teamsLogo';
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
                    <p key={item.id}>
                        <Link to={{ pathname: `/game/${item.id}/`, fromDashboard: false}}>
                            <div style={{ display:'inline-block' }}>
                                <TeamLogo id={item.home_team}/> vs <TeamLogo id={item.away_team}/>
                            </div>
                        </Link>
                    </p>
                    <hr/>
                    </div>
                    ))}
                </div>)
                }

export default Games;
