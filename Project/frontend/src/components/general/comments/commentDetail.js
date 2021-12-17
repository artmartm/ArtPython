import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchParticularUser } from "../../../redux_two/actions/asyncActions/asyncParticularUser";
import AuthContext from "../base/AuthContext";


function CommentDetail({ match }) {
    const[state, setState] = useState([{
        isOpen:false
    }])
    //let {user,authTokens} = useContext(AuthContext)
    const user ='123'
    const[comment, setComment] = useState({});
    //const[team,setTeam] = useState([]);
    const id = match.params.id;
    //const ct = '18';
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchParticularUser())
    }, []) 

    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/comments/${id}`,
        }).then(response=>{
            setComment(response.data)
        })
    },[id])


    return(
        <div>
            <h1>{comment.name} id is{comment.id}</h1>
            <h2>author is {comment.author}</h2>
            <h3>created at {comment.created_at}</h3>
            <Link to={{ pathname: `/update/${id}/`, fromDashboard: false}}>update</Link>
            <hr/>    
        </div>
    )
}

export default CommentDetail;
{/*}

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
          console.log(response.data);
        })
    }
   
    return (
      <div>
        <div className="container">
            <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        {true && user ?
        <h2 className="text-center mb-4">add a comments !{user.user_id}!</h2> : <p>asdasdasd</p>}
        <div className="form-group">
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
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

export default AddComment; */}