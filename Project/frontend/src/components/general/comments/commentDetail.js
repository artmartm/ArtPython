import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";


function CommentDetail({ match }) {
    const[state, setState] = useState([{
        isOpen:false
    }])
    const[comment, setComment] = useState({});
    //const[team,setTeam] = useState([]);
    const id = match.params.id;
    //const ct = '18';

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
            <h1>{comment.name}</h1>
            <h2>author is {comment.author}</h2>
            <h3>created at {comment.created_at}</h3>
        </div>
    )
}

export default CommentDetail;
