import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CommentComponent from "../../general/comments/commentComponent";
import CommentsList from "../../general/comments/commentsList";
import './../../../css/teams/gameDetail.css'
import { Button } from "@mui/material";


function GameDetail({ match }) {



    const stadiums = useSelector(state => state.stadiumsReducer.stadiums)

    const [showComments, setShowComments] = useState({ isOpen: false })
    const [game, setGame] = useState({});
    const id = match.params.id;
    const content_type = '17';
    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://127.0.0.1:8000/api/games/${id}`,
        }).then(response => {
            setGame(response.data)
            //      setPl(response.data.players)

        })
    }, [])



    const teams = useSelector(state => state.teamsReducer.teams)


    return (
        <div>
            {game.home_team && game.away_team && teams.length > 0 && stadiums.length > 0
                ?
                <div>
                    <div>
                        <div className='main-container'>
                            <div className='team-container-one'>
                                <Link to={{ pathname: `/teams/${game.home_team}/`, fromDashboard: false }}>
                                    <img src={teams[game.home_team - 1].team_logo}
                                        className='game-image-container' />
                                </Link>
                                <p className='position-one'>{teams[game.home_team - 1].second_name}</p>
                            </div>
                            <p className='position-one'>{game.home_team_goals} : {game.away_team_goals}</p>
                            <div className='team-container-one'>
                                <Link to={{ pathname: `/teams/${game.away_team}/`, fromDashboard: false }}>
                                    <img className='position-one' src={teams[game.away_team - 1].team_logo}
                                        className='game-image-container' />
                                </Link>
                                <p className='position-one'>{teams[game.away_team - 1].second_name}</p>
                            </div>
                        </div>
                        <hr style={{ width: 700 }} />
                    </div>
                    <h1>winner is {game.winner}</h1>
                    <h2>
                        <Link className='link-dashboard'
                            to={{ pathname: `/stadiums/${stadiums[game.stadium - 1].id}/`, fromDashboard: false }}>
                            stadium {stadiums[game.stadium - 1].name}
                        </Link>
                    </h2>
                    {game.win[2] == 'good game' ?
                        <h2>{game.winner} were better today</h2>
                        : <p>it was a good game but {game.winner} were a little bit better</p>}
                </div>
                : <p>no game</p>
            }

            <React.Fragment>
                <Button onClick={() => { setShowComments({ isOpen: true }) }}>show comments</Button>
                {showComments.isOpen &&
                    <div>
                        <CommentsList key={id} obj={id} ct={content_type} />
                        <Button onClick={() => { setShowComments({ isOpen: false }) }}>close</Button>
                    </div>
                }
            </React.Fragment>
            <CommentComponent obj={id} ct={content_type} />
        </div>
    )
}

export default GameDetail;
