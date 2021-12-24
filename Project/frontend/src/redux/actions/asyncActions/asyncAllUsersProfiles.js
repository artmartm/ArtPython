import { getAllUsersProfiles } from "../actions"


export const fetchUsersProfiles =()=>{
    return function(dispatch) {
        fetch(`http://127.0.0.1:8000/api/users-profile/`)
            .then(response => response.json())
            .then(json => dispatch(getAllUsersProfiles(json)))
    }
}

