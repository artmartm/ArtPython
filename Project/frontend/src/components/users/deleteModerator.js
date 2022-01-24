import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../general/base/AuthContext';
import { Button } from "@mui/material";


function DeleteModerator({ id }) {

    let { authTokens } = useContext(AuthContext)

    let history = useHistory();
    const Delete = async () => {



        await axios({
            method: 'delete',
            url: `http://127.0.0.1:8000/api/users-special-fields/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
        }).then(response => {
            history.push('/')
        })
    }

    return (
        <div className='for-delete-update'>
            <Button onClick={Delete}>delete</Button>
        </div>
    );
};

export default DeleteModerator;