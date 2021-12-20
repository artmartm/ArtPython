import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { fetchParticularUser } from "../../../redux_two/actions/asyncActions/asyncParticularUser";
import AuthContext from "../base/AuthContext";
import DeleteComment from "./deleteComment";
import UP from "./update";


function CommentDetail({ match }) {

    const[comment, setComment] = useState({});
    const id_id = match.params.id;

    const history=useHistory()


    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/comments/${id_id}`,
        }).then(response=>{
            setComment(response.data)
        })
    },[id_id])






    return(
        <div>
            <h1>{comment.name} id is{comment.id}</h1>
            <h2>author is {comment.author}</h2>
            <h3>created at {comment.created_at}</h3>
            <Link to={{ pathname: `/update/${id_id}/`, fromDashboard: false}}>update</Link>
            <hr/>
            <DeleteComment id={id_id}/>   
            <UP something={comment}/>
        </div>
    )
}

export default CommentDetail;