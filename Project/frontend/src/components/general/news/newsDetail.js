import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../base/AuthContext";
import './../../../css/general/news.css';
import DeleteNews from "./deleteNews";

function NewsDetail({ match }) {

    const [news, setNews] = useState({});

    const id_id = match.params.id;

    const history = useHistory()

    const [id, setId] = useState(null)
    const [name, setName] = useState(null)
    const [content_type, setContent_type] = useState(null)
    const [object_id, setObject_id] = useState(null)
    const [author, setAuthor] = useState(null)
    const [body, setBody] = useState(null)

    const [users, setUsers] = useState([]);

    let { authTokens, logoutUser } = useContext(AuthContext)

    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://127.0.0.1:8000/api/news/${id_id}`,
        }).then(response => {
            setNews(response.data)
            setName(response.data.name);
            setAuthor(response.data.author);
            setContent_type(response.data.content_type);
            setObject_id(response.data.object_id);
            setBody(response.data.body);
        })
    }, [id])

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

    const UpdateCom = async () => {
        let formField = new FormData()

        formField.append('name', name)
        formField.append('id', id)
        formField.append('content_type', content_type)
        formField.append('object_id', object_id)
        formField.append('author', author)
        formField.append('body', body)

        await axios({
            method: 'PUT',
            url: `http://127.0.0.1:8000/api/news/${id_id}/`,
            data: formField
        }).then(response => {
            console.log(response.data);
            history.push("/");
        })

    }
    return (
        <div className='single-news-container'>
            {news.name && users.length > 0 ?
                <div>
                    <div className='inside-single-news-container'>
                        <h1>{news.name}</h1>
                        <h2>author is {users[news.author].username}</h2>
                        <h3>created at {news.created_at}</h3>
                        <h4>body: {news.body}</h4>
                    </div>
                    <hr style={{ width: '90vh' }} />
                    <DeleteNews id={id_id}/>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="Enter body"
                            name="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </div>
                    <button onClick={UpdateCom} >Update</button>
                </div> : <></>}
        </div>
    )
}

export default NewsDetail;

{/*}
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


    const [users, setUsers] = useState([]);

    let { authTokens, logoutUser } = useContext(AuthContext)


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
        <div>
            <h1>{comment.name}</h1>
            {comment.name && users.length > 0 ?
                <h2>author is {users[comment.author].username}</h2>
                : <></>}
            <h3>created at {comment.created_at}</h3>
            <hr />
            <DeleteComment id={id} />
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
            <button onClick={UpdateCom} >Update</button>
        </div>
    )
}

export default CommentDetail;

*/}