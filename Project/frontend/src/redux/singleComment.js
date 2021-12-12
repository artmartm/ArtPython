import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { commentUpdate } from "./redux/action";

function SingleComment({data}) {
    
    const [commentText, setCommentText] = useState('');
    const {text, id} = data;
    const dispatch = useDispatch()

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(commentUpdate(commentText, id))
    }
    useEffect(()=> {
        if(text) {
            setCommentText(text);
        }
    },[text])
    const handleInput = (e) => {
        setCommentText(e.target.value)
    }
    return (
        <div>
            <form>
                <div>&times;</div>
                <input type='text'value={commentText}
                onChange={handleInput}/>
                <input type='submit' hidden/>
            </form>
        </div>
    )
}

export default SingleComment;