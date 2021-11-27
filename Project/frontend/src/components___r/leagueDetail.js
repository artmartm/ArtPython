import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

function LeagueDetail({ match }) {
    
    const[league, setLeague] = useState({});
    const[team, setTeam] = useState([]);
    const id = match.params.id;

    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/leagues/${id}`,
            mode: 'no-cors'
        }).then(response=>{
            setLeague(response.data)
            setTeam(response.data.teams)
        })
    },[id])


    return(
        <div>
            <h1>hello</h1>
            <h2>this is league</h2>
            {league.name}
            <hr/>
            {team.map(e=>(
                <Link key={e.id} to={`/team/${e.id}`} ><h2>{e.name}!</h2></Link>
            ))}
        </div>
    )
}

export default LeagueDetail;