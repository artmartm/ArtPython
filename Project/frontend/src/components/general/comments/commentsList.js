import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './../../../css/general/commentsList.css'

function CommentsList({ obj, ct }) {
    //let {user,authTokens, logoutUser} = useContext(AuthContext)
    const [comments, setComments] = useState([]);
    const particular_comments = [];

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/api/comments/",
            mode: "no-cors"
        }).then(response => {
            setComments(response.data)
        })
    }, [])

    {
        comments.length ?
        comments.map(e => (
            <div>
                {e.object_id == obj && e.content_type == ct ?
                    particular_comments.push(e)
                    :
                    <p></p>
                }
            </div>
        )) : <p>no comments yet</p>
    }

    return (
        <div>
            <h2>list of comments</h2>
            <hr style={{ width: 300 }} />
            {particular_comments.length ?
                particular_comments.map(e => (
                    <div>
                        <Link className='link' key={e.id} to={{ pathname: `/comments/${e.id}/`, fromDashboard: false }}>
                            <p className='for_p'>{e.name}</p>
                        </Link>
                    </div>
                )) :
                <p>no comments</p>}
        </div>
    )
}

export default CommentsList;