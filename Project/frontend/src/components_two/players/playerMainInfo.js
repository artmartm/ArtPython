import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

function PlayerMainInfo({ obj }) {
    
    const[player, setPlayer] = useState({});
    //const id = match.params.id;

    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/player-main-info/${obj}`,
        }).then(response=>{
            setPlayer(response.data)
        })
    },[obj])


    return(
        <div>
  <h1>Player personal info</h1>
            <h2>{player.weight}</h2>
            <h2>{player.height}</h2>
            <h2>{player.captain}!</h2>
            <h2>{player.academy}</h2>

        </div>
    )
}

export default PlayerMainInfo;
