import { useContext } from "react"
import AuthContext from "../../../components/general/base/AuthContext"
import { getAllUsersSpecialFields } from "../actions"



export const FetchUsersSpecialFields =()=>{
    return function(dispatch) {
        fetch(`http://127.0.0.1:8000/api/users-special-fields/`)
            .then(response => response.json())
            .then(json => dispatch(getAllUsersSpecialFields(json)))
    }
}
