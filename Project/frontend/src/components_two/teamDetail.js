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
            url:`http://127.0.0.1:8000/api/team/${id}`,
        }).then(response=>{
            setTeam(response.data)
            setPl(response.data.players)

        })
    },[id])


    return(
        <div>
            <h1>team!</h1>
            <h2>{team.name}</h2>
            <hr/>
            {pl.length ? pl.map(e=>(
                <Link key={e.id} to={`/team/${e.id}`} ><h2>{e.name}!!!</h2></Link>
            )) : <p>no players</p>
        }

        </div>
    )
}

export default TeamDetail;