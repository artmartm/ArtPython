import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import AuthContext from "../../general/base/AuthContext";


const styles = {
    img:{
    width:40,
    height:40,
    borderRadius:20}
}

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
                //'Authorization':'Bearer ' + String(authTokens.access)
            }
        }).then(response=>{
            setTeam(response.data)

        })
    },[id])
    return(
        <div>
            <p>{team.name} <img src={team.team_logo} style={styles.img}/></p>
        </div>

    )
}

export default TeamLogo;
