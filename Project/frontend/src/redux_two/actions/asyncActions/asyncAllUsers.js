import { getAllUsers } from "../actions"


export const fetchUsers =()=>{
    return function(dispatch) {
        fetch(`http://127.0.0.1:8000/auth/users/`)
            .then(response => response.json())
            .then(json => dispatch(getAllUsers(json)))
    }
}

