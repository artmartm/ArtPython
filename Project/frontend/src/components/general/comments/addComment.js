import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../base/AuthContext';




function AddComment({obj, ct}) {

  let {user,authTokens} = useContext(AuthContext)
  
    let history = useHistory();
    //let {user} = useContext(AuthContext);
    const [name, setName] = useState('')
    const [content_type, setContent_type] = useState(ct)
    const [object_id, setObject_id] = useState(obj)
    const [author, setAuthor] = useState(user.user_id)
    //const [created_at, setCreated_at] = useState(s)

  

    const Add = async () => {



        let formField = new FormData()
        formField.append('name',name)
        formField.append('content_type',content_type)
        formField.append('object_id',object_id)
        formField.append('author',author)
        //formField.append('created_at',created_at)

        await axios({
          method: 'post',
          url:'http://127.0.0.1:8000/api/comments/',
          data: formField
        }).then(response=>{
          setName('')
        })
    }
   
    return (
      <div>
        <div className="container">
            <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <div className="form-group">
          </div>
          <div className="form-group" >
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="leave a comment"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
         
          <button className="btn btn-primary btn-block" onClick={Add}>add comment</button>
       
      </div>
    </div>
        </div>
      </div>
    );
};

export default AddComment;