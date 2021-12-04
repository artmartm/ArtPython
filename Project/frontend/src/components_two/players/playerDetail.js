import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

function PlayerDetail({ match }) {
    
    const[player, setPlayer] = useState({});
    const[team,setTeam] = useState([]);
    const id = match.params.id;

    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/players/${id}`,
        }).then(response=>{
            setPlayer(response.data)
            setTeam(response.data.team)
        })
    },[id])


    return(
        <div>
  <h1>Player page</h1>
            <h2>{player.name}</h2>
            <Link style={{textDecoration: 'none'}} key={player.team} to={`/teams/${player.team}`} ><h2>team</h2></Link>
            <h2>{player.team}</h2>
            <h1>Player page!</h1>
            <h2>{player.name}!</h2>
            <Link style={{textDecoration: 'none'}} key={player.team} to={`/team/${player.team}`} ><h2>team</h2></Link>
                <hr/>
            {/*{player.map(e=>(
                <Link key={e.id} to={`/players/${e.id}`} ><h2>{e.name}!!!</h2></Link>
            ))} */}
        </div>
    )
}

export default PlayerDetail;
