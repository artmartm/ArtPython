import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CommentComponent from "../../general/comments/commentComponent";
import CommentsList from "../../general/comments/commentsList";
import './../../../css/teams/gameDetail.css'

function GameDetail({ match }) {



    const dispatch = useDispatch();

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
            {game.home_team && game.away_team
                ?
                <div>
                    <div>
                        <div className='main-container'>
                            <div className='team-container'>
                                <Link to={{ pathname: `/teams/${game.home_team}/`, fromDashboard: false }}>
                                    <img src={teams[game.home_team - 1].team_logo}
                                        className='game-image-container' />
                                </Link>
                                <p className='position'>{teams[game.home_team - 1].second_name}</p>
                            </div>
                            <p className='position'>{game.home_team_goals} : {game.away_team_goals}</p>
                            <div className='team-container'>
                                <Link to={{ pathname: `/teams/${game.away_team}/`, fromDashboard: false }}>
                                    <img className='position' src={teams[game.away_team - 1].team_logo}
                                        className='game-image-container' />
                                </Link>
                                <p className='position'>{teams[game.away_team - 1].second_name}</p>
                            </div>
                        </div>
                        <hr style={{ width: 400 }} />
                    </div>
                    <h1>winner is {game.winner}</h1>
                    <h2>game has been on <Link>{game.stadium}</Link></h2>
                </div>
                : <p>no game</p>
            }

            <React.Fragment>
                <button onClick={() => { setShowComments({ isOpen: true }) }}>show comments</button>
                {showComments.isOpen &&
                    <div>
                        <CommentsList key={id} obj={id} ct={content_type} />
                        <button onClick={() => { setShowComments({ isOpen: false }) }}>close</button>
                    </div>
                }
            </React.Fragment>
            <CommentComponent obj={id} ct={content_type} />
        </div>
    )
}

export default GameDetail;
