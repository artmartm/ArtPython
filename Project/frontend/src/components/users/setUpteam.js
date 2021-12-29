import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../general/base/AuthContext';
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";




function SetUpTeam({ obj }) {

    let { authTokens, logout } = useContext(AuthContext)

    let history = useHistory();
    const [favorite_team, setFavorite_team] = useState('')
    const [user, setUser] = useState(obj)


    const Add = async () => {

        let formField = new FormData()
        formField.append('favorite_team', favorite_team)
        formField.append('user', user)

        //formField.append('created_at',created_at)

        await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/users-profile/',
            /* headers: {
                'Content-Type': 'application/json',
               // 'Authorization': 'Bearer ' + String(authTokens.access)
            }, */
            data: formField
        }).then(response => {
            setFavorite_team('')
            history.push('/')
        })
    }
    const teams = useSelector(state => state.teamsReducer.teams)

    return (
        <div>
            <h1>set up teams</h1>
            <div>
                <label>
                    <div>
                        {teams.length > 0 ?
                            <select className='' value={favorite_team} onChange={(e) => setFavorite_team(e.target.value)}>
                                {teams.map(e => (
                                    <option value={e.id}>{e.name}</option>
                                )
                                )}
                            </select> : <></>} </div>
                    <Button onClick={Add}>set up</Button>
                </label>
            </div>
        </div>
    );
};

export default SetUpTeam;