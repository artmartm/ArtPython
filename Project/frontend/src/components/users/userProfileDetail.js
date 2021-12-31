import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AuthContext from "../general/base/AuthContext";
function UserProfileDetail({ match }) {

    const [profile, setProfile] = useState({});
    const teams = useSelector(state => state.teamsReducer.teams)
    let { authTokens, logoutUser } = useContext(AuthContext)

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
    }, [])


    let getUsers = async () => {
        let response = await fetch('http://127.0.0.1:8000/auth/users/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()

        if (response.status === 200) {
            setUsers(data)
        } else if (response.statusText === 'Unauthorized')
            logoutUser()
    }

    useEffect(() => {
        getNotes()
    }, [])
    const id = match.params.id;



    let getNotes = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/users-profile/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()

        if (response.status === 200) {
            setProfile(data)
        }
    }
    const part = []

    {
        users.map(e => {
            if (e.id == profile.user)
                part.push(e)
        })
    }


    return (
        <div>
            <div>
                {teams.length > 0 && profile.favorite_team && users.length > 0 ?
                    <div>
                        <h1>
                            {part.map(e =>
                            (<Link className='link-dashboard' to={{ pathname: `/users/${profile.user}/`, fromDashboard: false }}>
                                {e.username}'s detail profile!
                            </Link>))}
                        </h1>
                        <h2>favorite_team is </h2>
                        <Link className={'link'} key={profile.favorite_team} to={`/teams/${profile.favorite_team}`}>
                            <img src={teams[profile.favorite_team - 1].team_logo} className='stadium_main_img' />
                        </Link>
                    </div> : <></>}
            </div>
        </div>
    )
}

export default UserProfileDetail;