import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

function TeamDetail({ match }) {
    
    const[team, setTeam] = useState({});
    const[players, setPlayers] = useState([]);
    const id = match.params.id;

    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/team/${id}`,
            mode: 'no-cors'
        }).then(response=>{
            setTeam(response.data)
            setPlayers(response.data.players)
        })
    },[id])


    return(
        <div>
            <h1>hello</h1>
            <h2>this is team</h2>
            <h3>{team.name}!</h3>
            <hr/>
            {players.map(e=>(
                <Link key={e.id} to={ `/players/${e.id}`} ><h2>{e.name}!</h2></Link>
            ))}
        </div>
    )
}

export default TeamDetail;