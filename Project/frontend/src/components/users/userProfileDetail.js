import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
function UserProfileDetail({ match }) {

    const [profile, setProfile] = useState({});


   useEffect(()=> {
    getNotes()
    }, [])
    const id = match.params.id;


let getNotes = async() =>{
    let response = await fetch(`http://127.0.0.1:8000/api/users-profile/${id}`, {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            //'Authorization':'Bearer ' + String(authTokens.access)
        }
    })
    let data = await response.json()

    if(response.status === 200){
        setProfile(data)
    }}

    return(
        <div>
            <h1>user detail profile!</h1>
                    <div>
                    <p>id is {profile.id}</p>
                    <p>description is {profile.description}</p>
                    <p>country is {profile.country}</p>
                    <p>date_joined is {profile.date_joined}</p>
                    <p>updated_on is {profile.updated_on}</p>
                    <p>is_moderator is {profile.is_moderator}</p>
                    <p>ban is {profile.ban}</p>
                    <p>user is {profile.user}</p>
                    <p>city is {profile.city}</p>
                    <p>favorite_team is {profile.favorite_team}</p>
                </div>
        </div>
        )
}

export default UserProfileDetail;