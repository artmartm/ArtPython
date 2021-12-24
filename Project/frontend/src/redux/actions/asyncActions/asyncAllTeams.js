import { getAllTeams } from "../actions"


export const fetchTeams =()=>{
    return function(dispatch) {
        fetch(`http://127.0.0.1:8000/api/teams/`)
            .then(response => response.json())
            .then(json => dispatch(getAllTeams(json)))
    }
}

