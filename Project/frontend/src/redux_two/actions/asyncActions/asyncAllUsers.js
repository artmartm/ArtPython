import { useContext } from "react"
import AuthContext from "../../../components/general/base/AuthContext"
import { getAllUsers } from "../actions"


export const FetchUsers =()=>{
    let { authTokens, logoutUser } = useContext(AuthContext)
    return function(dispatch) {
        fetch(`http://127.0.0.1:8000/auth/users/`,{headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
        }})
            .then(response => response.json())
            .then(json => dispatch(getAllUsers(json)))
    }
}
{/*}
import { useContext } from "react"
import AuthContext from "../../../components/general/base/AuthContext"
import { getAllUsers } from "../actions"



export const FetchUsers =()=>{
    let {authTokens, logoutUser} = useContext(AuthContext)

    return function(dispatch) {
        fetch(`http://127.0.0.1:8000/auth/users/`, {
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
            .then(response => response.json())
            .then(json => dispatch(getAllUsers(json)))
    }
}
*/}

//////////////////



