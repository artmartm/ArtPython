import { getParticularUser } from "../actions"


export const fetchParticularUser =(user)=>{
    return function(dispatch) {
        fetch(`http://127.0.0.1:8000/auth/users/${user}`)
            .then(response => response.json())
            .then(json => dispatch(getParticularUser(json)))
    }
}

