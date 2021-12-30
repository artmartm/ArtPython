import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
//import '../Model.css';
import { Link } from 'react-router-dom';
import AuthContext from '../general/base/AuthContext';
import { useSelector } from 'react-redux';

function UserList() {

    const [teams, setTeams] = useState([]);


    let { authTokens, logoutUser } = useContext(AuthContext)

    useEffect(() => {
        getNotes()
    }, [])


    let getNotes = async () => {
        let response = await fetch('http://127.0.0.1:8000/auth/users/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()

        if (response.status === 200) {
            setTeams(data)
        } else if (response.statusText === 'Unauthorized')
            logoutUser()
    }

    return (
        <div>
            <h1>Users page</h1>
            <hr style={{ width:700 }}/>
            {teams.map(item => (
                <div>
                    <h2 key={item.id}>
                        <Link className='link-dashboard' to={{ pathname: `/users/${item.id}/`, fromDashboard: false }}>{item.username}</Link>
                    </h2>
                </div>
            ))}
        </div>)
}

export default UserList;
