import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import AuthContext from "../general/base/AuthContext";

function UserDetail({ match }) {
    
    const[team, setTeam] = useState({});
    const[pl, setPl] = useState([]);
    const id = match.params.id;

    let {authTokens, logoutUser} = useContext(AuthContext)

    const content_type = '14';
    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/auth/users/${id}`,
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        }).then(response=>{
            setTeam(response.data)
            setPl(response.data.players)

        })
    },[id])

    return(
        <div>
            <h1>{team.username}</h1>
            
        </div>

    )
}

export default UserDetail;
