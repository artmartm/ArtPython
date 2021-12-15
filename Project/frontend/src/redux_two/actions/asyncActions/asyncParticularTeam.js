import { getParticularTeam } from "../actions"


export const fetchParticularTeam =(team)=>{
    return function(dispatch) {
        fetch(`http://127.0.0.1:8000/api/teams/${team}`)
            .then(response => response.json(),[])
            .then(json => dispatch(getParticularTeam(json)))
    }
}