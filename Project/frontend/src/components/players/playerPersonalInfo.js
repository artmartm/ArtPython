import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './../../css/players/player.css'

function PlayerPersonalInfo({ obj }) {

    const [player, setPlayer] = useState({});
    //const id = match.params.id;

    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://127.0.0.1:8000/api/player-personal-info/${obj}`,
        }).then(response => {
            setPlayer(response.data)
        })
    }, [obj])


    return (
        <div className='main-info-container'>
            <ol>
                <li>color: {player.favorite_color}</li>
                <hr />
                <li>music: {player.favorite_music}</li>
                <hr />
                <li>movie: {player.favorite_movie}</li>
                <hr />
                <li>family: {player.family}</li>
                <hr />
                <li>education: {player.education}</li>
                <hr />
                <li>game: {player.favorite_game}</li>
                <hr />
                <li>car: {player.favorite_car}</li>
            </ol>
        </div>
    )
}

export default PlayerPersonalInfo;
