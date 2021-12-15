import { getAllPlayers } from "../actions"


export const fetchPlayers =()=>{
    return function(dispatch) {
        fetch(`http://127.0.0.1:8000/api/players/`)
            .then(response => response.json())
            .then(json => dispatch(getAllPlayers(json)))
    }
}

