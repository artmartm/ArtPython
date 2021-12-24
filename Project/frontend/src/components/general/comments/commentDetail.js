
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AuthContext from "../base/AuthContext";
import DeleteComment from "./deleteComment";
import './../../../css/general/news.css';


function CommentDetail({ match }) {

    const [comment, setComment] = useState({});
    const id_id = match.params.id;
    const dispatch = useDispatch();

    const history = useHistory()

    const [id, setId] = useState(null)
    const [name, setName] = useState(null)
    const [content_type, setContent_type] = useState(null)
    const [object_id, setObject_id] = useState(null)
    const [author, setAuthor] = useState(null)


    {/*useEffect(()=> {
        dispatch(FetchUsers())
    }, []) 

    const users = useSelector(state => state.usersReducer.users)*/}
    const [users, setUsers] = useState([]);

    let { authTokens, logoutUser, user } = useContext(AuthContext)


    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://127.0.0.1:8000/api/comments/${id_id}`,
        }).then(response => {
            setComment(response.data)
            setId(response.data.id);
            setName(response.data.name);
            setAuthor(response.data.author);
            setContent_type(response.data.content_type);
            setObject_id(response.data.object_id);
        })
    }, [id])

    /////////////
    useEffect(() => {
        getNotes()
    }, [])


    let getNotes = async () => {
        let response = await fetch('http://127.0.0.1:8000/auth/users/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()

        if (response.status === 200) {
            setUsers(data)
        } else if (response.statusText === 'Unauthorized')
            logoutUser()
    }
    ////////////////

    const UpdateCom = async () => {
        let formField = new FormData()

        formField.append('name', name)
        formField.append('id', id)
        formField.append('content_type', content_type)
        formField.append('object_id', object_id)
        formField.append('author', author)

        await axios({
            method: 'PUT',
            url: `http://127.0.0.1:8000/api/comments/${id_id}/`,
            data: formField
        }).then(response => {
            console.log(response.data);
            history.push("/");
        })

    }


    return (
        <div className='single-news-container'>
            <div className='inside-single-news-container'>
                <h1>{comment.name}</h1>
                {comment.name && users.length > 0 && user.admin ?
                    <h2>author is {users[comment.author].username}</h2>
                    : <></>}
                <h3>created at {comment.created_at}</h3>
                <hr />
                {user.user_id == comment.author || user.admin ?
                    <div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="for-input"
                                placeholder="Enter Your Name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='for-delete-update'>
                            <button onClick={UpdateCom} >Update</button>
                            <DeleteComment id={id} />
                        </div>
                    </div>:<></>}
            </div>
        </div>

    )
}

export default CommentDetail;
