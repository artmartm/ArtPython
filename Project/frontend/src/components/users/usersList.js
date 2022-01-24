import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
//import '../Model.css';
import { Link } from 'react-router-dom';
import AuthContext from '../general/base/AuthContext';
import { useSelector } from 'react-redux';
import Loader from '../general/loader';

function UserList() {

    const [users, setUsers] = useState([]);


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
            setUsers(data)
        } else if (response.statusText === 'Unauthorized')
            logoutUser()
    }

    return (
        <div>
            <h1>Users list</h1>
            <hr style={{ width: 700 }} />
            {users.length > 0 ?
                <div>
                    {users.map(item => (
                        <div>
                            <h2 key={item.id}>
                                <Link className='link-dashboard' to={{ pathname: `/users/${item.id}/`, fromDashboard: false }}>{item.username}</Link>
                            </h2>
                        </div>
                    ))}
                </div> : <Loader />}
        </div>)
}

export default UserList;
