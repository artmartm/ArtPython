import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
//import './Model.css';
import {Link} from 'react-router-dom';
import AddComment from './addComment';
import AuthContext from '../base/AuthContext';
import CommentComponent from './commentComponent';

function CommentsList({obj, ct}) {
    
    //let {user,authTokens, logoutUser} = useContext(AuthContext)

    const [comments, setComments] = useState([]);
    const particular_comments = [];

    useEffect( () => {
        axios({
            method:"GET",
            url:"http://127.0.0.1:8000/api/comments/",
            mode: "no-cors"
        }).then(response => {
            setComments(response.data)
        })
    },[])

    {comments.length ?
        comments.map(e=>(
            <div>
            {e.object_id==obj && e.content_type==ct ?
            particular_comments.push(e)
            :
            <p></p>
        }
        </div>
        )) : <p>no comments yet</p>
    }

    return(
        <div>
            <h1>list of comments</h1>
            <hr />
            {particular_comments.length? 
            particular_comments.map(e=>(
                <div>
                    <Link key={e.id} to={{ pathname: `/comments/${e.id}/`, fromDashboard: false}}><h3>{e.name}...added{e.author}</h3></Link>
                </div>
            )):
            <p>no comments</p>}
            <hr/>
            <CommentComponent obj={obj} ct={ct}/>
        </div>
    )
}

export default CommentsList;