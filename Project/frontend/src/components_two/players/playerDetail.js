import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AddComment from "../add";

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
                <hr/>
            <h2>list of comments</h2>
            <h2>leave a comment</h2>
            <AddComment obj={id}/>
            <br/>

        </div>
    )
}

export default PlayerDetail;
