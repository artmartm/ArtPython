import { rgbToHex } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTeams } from "../../redux_two/actions/asyncActions/asyncAllTeams";
import CommentComponent from "../general/comments/commentComponent";
import CommentsList from "../general/comments/commentsList";
import PlayerMainInfo from "./playerMainInfo";
import PlayerPersonalInfo from "./playerPersonalInfo";
import './../../css/players/player.css'



function PlayerDetail({ match }) {

    const [showComments, setShowComments] = useState([{
        isOpen: false
    }])


    const [player, setPlayer] = useState({});
    const id = match.params.id;
    const content_type = '18';

    const dispatch = useDispatch();


    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://127.0.0.1:8000/api/players/${id}`,
        }).then(response => {
            setPlayer(response.data)
        })
    }, [id])
    useEffect(() => {
        dispatch(fetchTeams())
    }, [])

    const teams = useSelector(state => state.teamsReducer.teams)


    return (
        <div>
            {player.team > 0 && teams.length > 0 ?
                <div style={{ backgroundImage: `url(${teams[player.team].team_background}})` }}
                    className='player-main-div'>
                    <div className='player_main' style={{ backgroundImage: `url(${player.background})` }}>
                        <div className='player-main-div'>
                            <div>
                                <img src={player.image} className='small_img' />
                                <div className='container-div'>
                                    <h1>{player.second_name} {player.name}</h1>
                                    <div className='player-info-div'>
                                        <h2>{player.position == 'Forward' ?
                                            <Link className='link'>
                                                {player.position} &#127954;
                                            </Link> :
                                            player.position == 'Defender' ?
                                                <Link className='link'>
                                                    {player.position} &#128737;
                                                </Link> :
                                                <Link className='link'>
                                                    {player.position} &#129349;
                                                </Link>}
                                        </h2>
                                        <Link
                                            className='player-team-link'
                                            style={{ textDecoration: 'none' }}
                                            key={player.team}
                                            to={`/teams/${player.team}`}>
                                            <img className='player-team-logo'
                                                src={teams[player.team - 1].team_logo} />
                                        </Link>
                                        <h2># {player.player_number}</h2>
                                        <h2>shoots: {player.shoots}</h2>
                                        <h2>score: {player.score}</h2>
                                        {player.captain ? <h2>C</h2> : <></>}
                                    </div>
                                </div>
                            </div>
                            <hr style={{ width: '100vh' }} />
                            <h2>Additional info</h2>
                            <div className='player-additional-info '>
                                <div className='history'>
                                    <div className='inside-history'>
                                        <PlayerPersonalInfo obj={player.id} />
                                    </div>
                                </div>
                                <div className='description'>
                                    <div className='inside-description'>
                                        <PlayerMainInfo obj={player.id} />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <hr />
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
                            <br />
                        </div>
                    </div>
                </div> : <>someting goes wrong</>}

        </div>
    )
}

export default PlayerDetail;
