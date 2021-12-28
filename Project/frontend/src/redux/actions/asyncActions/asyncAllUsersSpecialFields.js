import { useContext } from "react"
import AuthContext from "../../../components/general/base/AuthContext"
import { getAllUsersSpecialFields } from "../actions"





export const FetchUsersSpecialFields =()=>{
    let { authTokens, logoutUser } = useContext(AuthContext)
    return function(dispatch) {
        fetch(`http://127.0.0.1:8000/api/users-special-fields/`,{headers: {
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + String(authTokens.access)
        }})
            .then(response => response.json())
            .then(json => dispatch(getAllUsersSpecialFields(json)))
    }
}


