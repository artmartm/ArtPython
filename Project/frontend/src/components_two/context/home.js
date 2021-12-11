import React, {useContext, useEffect, useState} from "react";
import AuthContext from "./authContext";

function HomePage() {
    let [profiles, setProfiles] = useState([]);
    let {authTokens, logoutUser} = useContext(AuthContext);

    useEffect(()=>{
        getNotes()
    },[])

    let getNotes = async()=>{
        let response = await fetch('http://127.0.0.1:8000/api/comments/', {
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+String(authTokens.access)
            }
        })
        let data = await response.json()
        if(response.status===200) {
            setProfiles(data)
        } else if (response.statusText === 'Unauthorized') {
            logoutUser()
        }
    }

    return(
        <div>
            <p>logged in</p>
            <ul>
                {profiles.map(profile=>(
                    <p key={profile.id}>{profile.name}</p>
                ))}
                <h1>hello token</h1>
            </ul>
        </div>
    )
}
export default HomePage;