import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

function TeamDetail({ match }) {
    
    const[team, setTeam] = useState({});
    const[pl, setPl] = useState([]);
    const id = match.params.id;

    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/teams/${id}`,
        }).then(response=>{
            setTeam(response.data)
            setPl(response.data.players)

        })
    },[id])


    return(
        <div>
            <h1>{team.name}</h1>
            <h1>{team.games}</h1>

            <h2>{team.team_logo}</h2>
            <div style={{backgroundImage:team.team_logo}}><h1></h1></div>
            {team.team_logo ? <img src={team.team_logo} /> : <p>no photo yet</p>}
            <hr/>
            <h3>list of players</h3>
            {pl.length ? pl.map(e=>(
                <Link key={e.id} to={`/players/${e.id}`} ><h2>{e.name}!!!</h2></Link>
            )) : <p>no players</p>
        }
        </div>
    )
}

export default TeamDetail;
