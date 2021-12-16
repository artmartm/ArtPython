import React, {useState, useEffect} from 'react';
import axios from 'axios';
//import '../../Model.css';
import {useDispatch, useSelector} from 'react-redux';

import {Link} from 'react-router-dom';
import TeamLogo from '../teams/teamsLogo';
import AddGame from './addGame';
function Games() {

    const [games, setGames] = useState([]);

    const dispatch = useDispatch();
    const teams = useSelector(state => state.teamsReducer.teams)
    
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
                {games.map(item => (
                    <div>
                    <p key={item.id}>
                        <Link to={{ pathname: `/game/${item.id}/`, fromDashboard: false}}>
                            <div style={{ display:'inline-block' }}>
                            <h3>{teams[item.home_team-1].name} vs {teams[item.away_team-1].name}</h3>
                                <TeamLogo id={item.home_team}/> vs <TeamLogo id={item.away_team}/>
                            </div>
                        </Link>
                    </p>
                    <hr/>
                    </div>
                    ))}
                <AddGame/>
                </div>)
                }

export default Games;

