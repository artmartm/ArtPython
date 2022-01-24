import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../general/base/AuthContext';
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";




function ChangeTeam({ obj, f_t, id }) {

    let { authTokens, logout } = useContext(AuthContext)

    let history = useHistory();
    const [favorite_team, setFavorite_team] = useState('')
    const [user, setUser] = useState('')

    const [showWindow, setShowWindow] = useState({ isOpen: false });
    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://127.0.0.1:8000/api/comments/${id}`,
        }).then(response => {
            setFavorite_team(response.data)
            setUser(response.data.id);

        })
    }, [id])

    const Add = async () => {

        let formField = new FormData()
        formField.append('favorite_team', favorite_team)
        formField.append('user', user)

        
        await axios({
            method: 'put',
            url: `http://127.0.0.1:8000/api/users-profile/${id}`,
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
            <br />
            <React.Fragment>
                <Button onClick={() => { setShowWindow({ isOpen: true }) }}>change team</Button>
                {showWindow.isOpen &&
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
                            <Button onClick={Add}>change team</Button>
                        </label>
                        <br />
                        <Button onClick={() => { setShowWindow({ isOpen: false }) }}>close</Button>

                    </div>}
            </React.Fragment>
        </div>
    );
};

export default ChangeTeam;
