import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
//import '../../Model.css';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import TeamLogo from '../teams/teamsLogo';
import AddGame from './addGame';
import AuthContext from '../../general/base/AuthContext';
import './../../../css/teams/particularTeamGame.css';

function ParticularTeamGame({ team, show }) {

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

    {
        games.map(e => {
            if (e.home_team == team || e.away_team == team)
                particularGames.push(e)
        })
    }

    return (
        <div>
            {particularGames.length ?
                <div>
                    {show ?
                        <div>
                            <h1><Link className='link' to={{ pathname: `/game/${particularGames[0].id}/`, fromDashboard: false }}>
                                <div>
                                    <div className='special-game-container'>
                                        <div className='team-container'>
                                            <img className='position' src={teams[particularGames[0].home_team - 1].team_logo} className='img-container' />
                                            <p className='position'>{teams[particularGames[0].home_team - 1].name}</p>
                                        </div>
                                        <p className='position'>{particularGames[0].home_team_goals} : {particularGames[0].away_team_goals}</p>
                                        <div className='team-container'>
                                            <img className='position' src={teams[particularGames[0].away_team - 1].team_logo} className='img-container' />
                                            <p className='position'>{teams[particularGames[0].away_team - 1].name}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            </h1>
                            {/*{particularGames.map(e => (
                                <h1><Link className='link' to={{ pathname: `/game/${e.id}/`, fromDashboard: false }}>
                                    <div>
                                        <div className='game-container'>
                                            <div className='team-container'>
                                                <img className='position' src={teams[e.home_team - 1].team_logo} className='img-container' />
                                                <p className='position'>{teams[e.home_team - 1].name}</p>
                                            </div>
                                            <p className='position'>{e.home_team_goals} : {e.away_team_goals}</p>
                                            <div className='team-container'>
                                                <img className='position' src={teams[e.away_team - 1].team_logo} className='img-container' />
                                                <p className='position'>{teams[e.away_team - 1].name}</p>
                                            </div>
                                        </div>
                                        <hr style={{ width: 400 }} />
                                    </div>
                                </Link>
                                </h1>
                            ))} */}
                        </div>
                        :
                        <div>
                            {particularGames.map(e => (
                                <h1><Link className='link' to={{ pathname: `/game/${e.id}/`, fromDashboard: false }}>
                                    <div>
                                        <div className='game-container'>
                                            <div className='team-container'>
                                                <img className='position' src={teams[e.home_team - 1].team_logo} className='img-container' />
                                                <p className='position'>{teams[e.home_team - 1].name}</p>
                                            </div>
                                            <p className='position'>{e.home_team_goals} : {e.away_team_goals}</p>
                                            <div className='team-container'>
                                                <img className='position' src={teams[e.away_team - 1].team_logo} className='img-container' />
                                                <p className='position'>{teams[e.away_team - 1].name}</p>
                                            </div>
                                        </div>
                                        <hr style={{ width: 400 }} />
                                    </div>
                                </Link>
                                </h1>
                            ))}
                        </div>
                    }
                </div>
                :
                <p>no games</p>
            }
        </div>)
}

export default ParticularTeamGame;

