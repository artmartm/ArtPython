import { getAllComments } from "../actions"


export const fetchComments =()=>{
    return function(dispatch) {
        fetch(`http://127.0.0.1:8000/api/comments/`)
            .then(response => response.json())
            .then(json => dispatch(getAllComments(json)))
    }
}

