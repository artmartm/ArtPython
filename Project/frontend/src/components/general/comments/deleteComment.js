import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthContext from '../base/AuthContext';


function DeleteComment({ id }) {

  let { user, authTokens, logoutUser } = useContext(AuthContext)


  const history = useHistory()

  const Delete = async () => {
    let formField = new FormData()

    await axios({
      method: 'delete',
      url: `http://127.0.0.1:8000/api/comments/${id}`,
      data: formField,
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      }
    }).then(response => {
      console.log(response.data);
      history.push('/')
    })
  }

  return (
    <div>
      <div className="form-group">
        <DeleteIcon onClick={() => Delete()} />
      </div>
    </div>
  );
};

export default DeleteComment;