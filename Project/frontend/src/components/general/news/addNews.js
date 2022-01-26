import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../base/AuthContext';
import { Button } from "@mui/material";




function AddNews({ obj, ct }) {

  let { user, authTokens } = useContext(AuthContext)

  const [addNewsWindow,setAddNewsWindow] = useState({isOpen:false});

  let history = useHistory();
  const [name, setName] = useState('')
  const [content_type, setContent_type] = useState(ct)
  const [object_id, setObject_id] = useState(obj)
  const [author, setAuthor] = useState(user.user_id)
  const [body, setBody] = useState('')


  const Add = async () => {



    let formField = new FormData()
    formField.append('name', name)
    formField.append('content_type', content_type)
    formField.append('object_id', object_id)
    formField.append('author', author)
    formField.append('body', body)
    //formField.append('created_at',created_at)

    await axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/news/',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      data: formField
    }).then(response => {
      setName('')
      setBody('')
    })
  }

  return (
    <div>
      {authTokens ?
      <div>
        {user.admin || user.moderator ?
          <div>
            <React.Fragment>
              <Button onClick={() => { setAddNewsWindow({ isOpen: true }) }}>open news window</Button>
                {addNewsWindow.isOpen &&
<div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter name"
                className='for-input'
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <textarea
                className='text-area'
                type="text"
                placeholder="Enter body"
                name="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
            <div className='for-delete-update'>
              <Button onClick={Add}>add news</Button>
            </div>
            <Button onClick={() => { setAddNewsWindow({ isOpen: false }) }}>close</Button>
            </div>
            }
            </React.Fragment>

          </div> : <></>}

      </div>
      :<></>}
      </div>
      );
};

      export default AddNews;
