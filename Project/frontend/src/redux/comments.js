import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import SingleComment from "./singleComment";
import {commentCreate} from './redux/action'

function Comments(props) {
    const [textComment, setTextComment] = useState('');
    const comments = useSelector(state=>{
        console.log('redux state', state)
        const {commentReducer} = state;
        return commentReducer.comments;

    })
    console.log('comments ', comments)
    const dispatch= useDispatch();

    const handleInput =(e) => {
        console.log('inp', e.target.value);
        setTextComment(e.target.value)
    }
    
    const handleSubmit =(e) => {
        e.preventDefault();
        console.log('subm' ,textComment)
        const id = new Date();
        dispatch(commentCreate(textComment, id))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' value={textComment} onChange={handleInput}/>
                <input type='submit' hidden/>
            </form>
            {!!comments.length && comments.map((res)=>{
                return <SingleComment key={res.id} data={res}/>
            })}
            
        </div>
    )
}

export default Comments;