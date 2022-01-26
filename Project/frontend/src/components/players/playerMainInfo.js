import axios from "axios";
import React, { useState, useEffect } from "react";
import './../../css/players/playerInfo.css';
function PlayerMainInfo({ obj }) {

    const [player, setPlayer] = useState({});
    const [mistake, setMistake] = useState(false);


    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://127.0.0.1:8000/api/player-main-info/${obj}`,
        }).then(response => {
            setPlayer(response.data)
        }).catch(error => {
            if (error.response) {
                setMistake(true)
            }
        })
    }, [obj])


    return (
        <div className='main-info-container'>
            {mistake == false ?
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