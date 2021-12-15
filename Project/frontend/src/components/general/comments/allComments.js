import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
const AllCommentsList=()=> {

    const dispatch = useDispatch();
    const comments = useSelector(state => state.commentsReducer.comments)


    return(
        <div>
            <h1>list of comments</h1>
            <hr/>
            {comments.length ?
            <div >
                {comments.map(comment => 
                    <div key={comment.id}>
                    <h1><Link to={{ pathname: `/comments/${comment.id}/`, fromDashboard: false}}>{comment.name}</Link></h1>
                    </div>
                    )}
            </div>
            :
            <p>no stadiums</p>
            }
        </div>
    )
}
export default AllCommentsList;




