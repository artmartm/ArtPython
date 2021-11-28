import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Model.css';
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
            <h1>comments page</h1>
            <hr/>
            {comments.map(e=>(
                <div>
                    <h2>{e.name}</h2>
                </div>
            ))}
        </div>
    )
}

export default Comments;