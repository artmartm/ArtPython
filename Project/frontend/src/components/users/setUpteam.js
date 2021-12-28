import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../general/base/AuthContext';




function SetUpTeam({obj}) {

    let { authTokens,logout } = useContext(AuthContext)

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
        })
    }

    return (
        <div>
            <h1>add news here</h1>
            <div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Enter name"
                        className='for-input'
                        name="favorite_team"
                        value={favorite_team}
                        onChange={(e) => setFavorite_team(e.target.value)}
                    />
                </div>
                <div className='for-delete-update'>
                    <button onClick={Add}>team</button>
                </div>
            </div>

        </div>
    );
};

export default SetUpTeam;

