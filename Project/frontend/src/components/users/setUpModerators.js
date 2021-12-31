import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../general/base/AuthContext';
import { Button } from "@mui/material";


function SetUpModerator({ id }) {

    let { authTokens, logout } = useContext(AuthContext)

    let history = useHistory();
    const [is_moderator, setIs_moderator] = useState('')
    const [user, setUser] = useState(id)

    const Add = async () => {

        let formField = new FormData()
        formField.append('is_moderator', is_moderator)
        formField.append('user', user)

        //formField.append('created_at',created_at)

        await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/users-special-fields/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            data: formField
        }).then(response => {
            setIs_moderator('')
            history.push('/')
        })
    }
    const ff = [{ id: 1 }];
    return (
        <div>
            <h2>set up moderators</h2>
            <div>
                <div className="form-group">
                    <label >

                        <select value={is_moderator} onChange={(e) => setIs_moderator(e.target.value)}>
                            <option>set up moderator</option>
                            {ff.map(e => (
                                <option value={e.id}>set up</option>
                            )
                            )}
                        </select>

                    </label>
                </div>
                <div className='for-delete-update'>
                    <Button onClick={Add}>set up</Button>
                </div>
            </div>

        </div>
    );
};

export default SetUpModerator;