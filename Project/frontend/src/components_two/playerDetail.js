import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

function PlayerDetail({ match }) {
    
    const[player, setPlayer] = useState({});
    const id = match.params.id;

    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/player/${id}`,
        }).then(response=>{
            setPlayer(response.data)
        })
    },[id])


    return(
        <div>
            <h1>Player page</h1>
            <h2>{player.name}</h2>
            <h2>{player.team}</h2>
            <hr/>
            {/*{player.map(e=>(
                <Link key={e.id} to={`/player/${e.id}`} ><h2>{e.name}!!!</h2></Link>
            ))} */}
        </div>
    )
}

export default PlayerDetail;