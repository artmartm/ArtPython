import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../general/base/AuthContext';




function SetUpModerator() {

    let { authTokens, logout } = useContext(AuthContext)

    let history = useHistory();
    const [is_moderator, setIs_moderator] = useState(1)
    const [user, setUser] = useState(1)


    const Add = async () => {

        let formField = new FormData()
        formField.append('is_moderator', is_moderator)
        formField.append('user', user)

        //formField.append('created_at',created_at)

        await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/users-special-fields/',
            /* headers: {
                'Content-Type': 'application/json',
               // 'Authorization': 'Bearer ' + String(authTokens.access)
            }, */
            data: formField
        }).then(response => {
            setIs_moderator('')
        })
    }
    const handleToggle = ({ target }) =>
    setIs_moderator(s => ({ ...s, [target.name]: !s[target.name] }));
    return (
        <div>
            <h1>set up moderators</h1>
            <div>
                <div className="form-group">
                <input
                        type="text"
                        placeholder="Enter name"
                        className='for-input'
                        name="is_moderator"
                        value={is_moderator}
                        onChange={(e) => setIs_moderator(e.target.value)}
                    />
                </div>
                <div className='for-delete-update'>
                    <button onClick={Add}>set up</button>
                </div>
            </div>

        </div>
    );
};

export default SetUpModerator;

