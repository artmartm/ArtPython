import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './../../css/players/playerInfo.css';
function PlayerMainInfo({ obj }) {

    const [player, setPlayer] = useState({});
    //const id = match.params.id;

    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://127.0.0.1:8000/api/player-main-info/${obj}`,
        }).then(response => {
            setPlayer(response.data)
        })
    }, [obj])


    return (
        <div className='main-info-container'>
            {player.weight ?
                <ol>
                    <li>height: {player.weight}</li>
                    <hr />
                    <li>weight lb: {player.height}</li>
                    <hr />
                    <li>academy: {player.academy}</li>
                    <hr />
                    <li>sport brand: {player.sport_brand}</li>
                    <hr />
                    <li>salary: {player.salary_per_year}$</li>
                    <hr />
                    <li>contract: {player.contract_till}</li>
                </ol>
                : <h1>no info</h1>}
        </div>
    )
}

export default PlayerMainInfo;
