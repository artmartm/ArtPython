import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import AuthContext from '../../general/base/AuthContext';
import './../../../css/teams/particularTeamGame.css';

function ParticularTeamGame({ team, show }) {

    const [games, setGames] = useState([]);
    let { authTokens } = useContext(AuthContext)

    const dispatch = useDispatch();
    const teams = useSelector(state => state.teamsReducer.teams)

    const particularGames = [];
    const oneGame = []

    //const [showMatches,setShowMatches]=useState({ isOpen: false });
   // const[show,setShow]=useState({isOpen:false});

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/api/games/",
            mode: "no-cors"
        }).then(response => {
            setGames(response.data)
        })
    }, [])


    games.map(e => {
        if (e.home_team == team || e.away_team == team)
            particularGames.push(e)
        if ((e.home_team == team || e.away_team == team) && oneGame.length < 1)
            oneGame.push(e)
    })

    return (
        <div>
            {particularGames.length > 0 && oneGame.length > 0 && teams.length > 0 ?
                <div>
                    {show ?
                        <div>
                            {oneGame.map(e => (
                                <h1><Link className='link' to={{ pathname: `/game/${e.id}/`, fromDashboard: false }}>
                                    <div>
                                        <div className='special-game-container'>
                                            <div className='team-container'>
                                                <img className='position' src={teams[e.home_team - 1].team_logo} className='img-container' />
                                                <p className='position'>{teams[e.home_team - 1].name}</p>
                                            </div>
                                            <div className='team-container-2'>
                                            <p className='position'>{e.home_team_goals} : {e.away_team_goals}</p>
                                            </div>
                                            <div className='team-container'>
                                                <img className='position' src={teams[e.away_team - 1].team_logo} className='img-container' />
                                                <p className='position'>{teams[e.away_team - 1].name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                </h1>
                            ))}
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

