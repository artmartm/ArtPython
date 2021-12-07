import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

function GameDetail({ match }) {
    
    const[game, setGame] = useState({});
    //const[pl, setPl] = useState([]);
    const id = match.params.id;

    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/games/${id}`,
        }).then(response=>{
            setGame(response.data)
      //      setPl(response.data.players)

        })
    },[id])


    return(
        <div>
            <h1>{game.name}</h1>
            <p>winner is <b>{game.winner}</b></p>
        </div>
    )
}

export default GameDetail;
