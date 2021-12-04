import React, {useState, useEffect} from 'react';
import axios from 'axios';
//import './Model.css';
import {Link} from 'react-router-dom';

function Comments() {
    
    const [comments, setComments] = useState([]);

    useEffect( () => {
        axios({
            method:"GET",
            url:"http://127.0.0.1:8000/api/comments/",
            mode: "no-cors"
        }).then(response => {
            setComments(response.data)
        })
    },[])
    return(
        <div>
            <h1>list of comments</h1>
            <hr />
            {comments.length ?
                comments.map(e=>(
                    <ul>
                    <li key={e.id}>{e.name}</li>
                    </ul>
                )) : <p>no comments yet</p>
            }
        </div>
    )
}

export default Comments;
