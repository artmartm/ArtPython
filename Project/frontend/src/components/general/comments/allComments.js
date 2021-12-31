import { useSelector } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
const AllCommentsList = ({ obj, ct }) => {

    const comments = useSelector(state => state.commentsReducer.comments)
    const particular_comments = [];
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
            <h1>list of comments</h1>
            <hr />
            {particular_comments.length ?
                <div>
                    {particular_comments.map(comment =>
                        <div key={comment.id}>
                            <h1><Link to={{ pathname: `/comments/${comment.id}/`, fromDashboard: false }}>{comment.name}</Link></h1>
                        </div>
                    )}
                </div>
                :
                <p>no comments</p>
            }
        </div>
    )
}
export default AllCommentsList;


