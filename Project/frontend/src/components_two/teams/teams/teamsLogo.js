import axios from "axios";
import React, {useState, useEffect, useContext} from "react";

import AuthContext from "./AuthContext";

function TeamLogo({id}) {
    
    const[team, setTeam] = useState({});

    let {authTokens, logoutUser} = useContext(AuthContext)

    const content_type = '14';
    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/teams/${id}`,
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        }).then(response=>{
            setTeam(response.data)

        })
    },[id])
    return(
        <div>
            <h1>{team.name} <img src={team.team_logo} width={50} height={50}/></h1>
        </div>

    )
}

export default TeamLogo;
