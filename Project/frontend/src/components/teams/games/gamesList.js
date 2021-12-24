import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
//import '../../Model.css';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import AddGame from './addGame';
import AuthContext from '../../general/base/AuthContext';
import './../../../css/teams/gamesList.css'

function Games() {

    const [games, setGames] = useState([]);
    let { authTokens } = useContext(AuthContext)

    const dispatch = useDispatch();
    const teams = useSelector(state => state.teamsReducer.teams)

    const particularGames = [];

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/api/games/",
            mode: "no-cors"
        }).then(response => {
            setGames(response.data)
        })
    }, [])

    return (
        <div>
            {teams.length > 0 ?
                <div>
                    {games.map(e => (
                        <h1><Link className='link' to={{ pathname: `/game/${e.id}/`, fromDashboard: false }}>
                            <div>
                                <div className='game-container'>
                                    <div className='team-container'>
                                        <img className='position' src={teams[e.home_team - 1].team_logo} className='image-container' />
                                        <p className='position'>{teams[e.home_team - 1].name}</p>
                                    </div>
                                    <p className='position'>{e.home_team_goals} : {e.away_team_goals}</p>
                                    <div className='team-container'>
                                        <img className='position' src={teams[e.away_team - 1].team_logo} className='image-container' />
                                        <p className='position'>{teams[e.away_team - 1].name}</p>
                                    </div>
                                </div>
                                <hr style={{ width: 400 }} />
                            </div>
                        </Link>
                        </h1>
                    ))}
                    {authTokens ?
                        <div>
                            <AddGame />
                        </div>
                        :
                        <p>to add a game you need to be <Link to={'/login'}>logged-in</Link></p>}
                </div>
                : <></>}
        </div>)
}

export default Games;