import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
//import '../Model.css';
import { Link } from 'react-router-dom';
import AuthContext from '../general/base/AuthContext';
import { useSelector } from 'react-redux';

function UsersProfilesList() {

    const [teams, setTeams] = useState([]);

    let { authTokens, logoutUser } = useContext(AuthContext)

    useEffect(() => {
        getNotes()
    }, [])


    let getNotes = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/users-profile/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()

        if (response.status === 200) {
            setTeams(data)
        }
    }

    return (
        <div>
            <h1>users' profiles list</h1>
            <hr />
            {teams.map(e => (
                <div>
                    <Link to={{ pathname: `/profiles/${e.id}/`, fromDashboard: false }} key={e.id}>user is {e.user} with {e.id} id</Link>
                </div>
            ))}
        </div>
    )
}

export default UsersProfilesList;
