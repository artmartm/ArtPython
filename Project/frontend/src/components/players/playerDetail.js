import { rgbToHex } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTeams } from "../../redux_two/actions/asyncActions/asyncAllTeams";
import AddComment from "../general/comments/addComment";
import CommentComponent from "../general/comments/commentComponent";
import CommentsList from "../general/comments/commentsList";
import TeamLogo from "../teams/teams/teamsLogo";
import PlayerMainInfo from "./playerMainInfo";
import PlayerPersonalInfo from "./playerPersonalInfo";
import './../../css/players/player.css'



function PlayerDetail({ match }) {

    const [showComments, setShowComments] = useState([{
        isOpen: false
    }])
    const [showPersonalInfo, setShowPersonalInfo] = useState([{
        isOpen: false
    }])
    const [showMainInfo, setShowMainInfo] = useState([{
        isOpen: false
    }])

    const [player, setPlayer] = useState({});
    const id = match.params.id;
    const content_type = '18';

    const dispatch = useDispatch();
    const teams = useSelector(state => state.teamsReducer.teams)

    useEffect(() => {
        dispatch(fetchTeams())
    }, [])


    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://127.0.0.1:8000/api/players/${id}`,
        }).then(response => {
            setPlayer(response.data)
        })
    }, [id])
    return (
        <div>
            <div className='player_main'>
                <div className='back-card' style={{ backgroundImage: `url(${player.background})` }}>
                    <h1>{player.name}</h1>
                    <h2># {player.player_number}</h2>
                    <div>
                    <img src={player.image} className='small_img' />
                    <h3>position is {player.position}</h3>
                    <h3>current team is {player.team} teams[player.team].name<Link
                        style={{ textDecoration: 'none' }}
                        key={player.team}
                        to={`/teams/${player.team}`}>
                    </Link>
                    </h3>
                    </div>
                </div>
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
                <React.Fragment>
                    <button onClick={() => { setShowPersonalInfo({ isOpen: true }) }}>show personal info</button>
                    {showPersonalInfo.isOpen &&
                        <div>
                            <PlayerPersonalInfo obj={player.id} />
                            <button onClick={() => { setShowPersonalInfo({ isOpen: false }) }}>close</button>
                        </div>
                    }
                </React.Fragment>
                <React.Fragment>
                    <button onClick={() => { setShowMainInfo({ isOpen: true }) }}>show main info</button>
                    {showMainInfo.isOpen &&
                        <div>
                            <PlayerMainInfo obj={player.id} />
                            <button onClick={() => { setShowMainInfo({ isOpen: false }) }}>close</button>
                        </div>
                    }
                </React.Fragment>
            </div>
        </div>
    )
}

export default PlayerDetail;
