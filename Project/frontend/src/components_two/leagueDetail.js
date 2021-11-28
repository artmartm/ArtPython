import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

function LeagueDetail({ match }) {
    
    const[league, setLeague] = useState({});
    const[team, setTeam] = useState([]);
    const[cm, setCm] = useState([]);
    const id = match.params.id;

    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/leagues/${id}`,
            mode: 'no-cors'
        }).then(response=>{
            setLeague(response.data)
            setTeam(response.data.teams)
            setCm(response.data.news)
        })
    },[id])


    return(
        <div>
            <h1>hello this is {league.name}</h1>            
            <hr/>
            <h3>teams:</h3>
            {team.map(e=>(
                <Link key={e.id} to={`/team/${e.id}`} ><h2>{e.name}!</h2></Link>
            ))}
            <hr/>
            <h3>news:</h3>
            {cm.map(e=>(
                <Link key={e.id}><p>{e.name}</p></Link>
            ))}
        </div>
    )
}

export default LeagueDetail;