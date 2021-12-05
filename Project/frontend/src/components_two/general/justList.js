import React, {useState, useEffect} from 'react';
import axios from 'axios';
//import './Model.css';
import {Link} from 'react-router-dom';

function JustList({obj}) {
    
    const [comments, setComments] = useState([]);

    useEffect( () => {
        axios({
            method:"GET",
            url:"http://127.0.0.1:8000/api/just/",
            mode: "no-cors"
        }).then(response => {
            setComments(response.data)
        })
    },[])
    let some_l = [];
    {comments.length ?
        comments.map(e=>(
            <div>
            {e.object_id==obj && e.content_type==18 ?
            some_l.push(e)
            :
            <p></p>
        }
        </div>
        )) : <p>no comments yet</p>
    }

    return(
        <div>
            <h1>list of just</h1>
            <hr />
            {some_l.length ? 
            some_l.map(e=>(
                <div>
                    <h3 key={e.id}>{e.name}</h3>
                </div>
            )):
            <p>no comments</p>}
        </div>
    )
}

export default JustList;
