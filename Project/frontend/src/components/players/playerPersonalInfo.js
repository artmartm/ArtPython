import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        <div>
            <h1>Player personal info</h1>
            <h2>{player.favorite_color}</h2>
            <h2>{player.favorite_music}</h2>
            <h2>{player.favorite_car}</h2>
        </div>
    )
}

export default PlayerPersonalInfo;
