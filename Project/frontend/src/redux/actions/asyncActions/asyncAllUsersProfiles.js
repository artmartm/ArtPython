import { useContext } from "react"
import AuthContext from "../../../components/general/base/AuthContext"
import { getAllUsersProfiles } from "../actions"


export const FetchUsersProfiles =()=>{

    return function(dispatch) {
        
        fetch(`http://127.0.0.1:8000/api/users-profile/`,{headers: {
//            'Content-Type': 'application/json',
//            'Authorization': 'Bearer ' + String(authTokens.access)
        }})
            .then(response => response.json())
            .then(json => dispatch(getAllUsersProfiles(json)))
    }
}

