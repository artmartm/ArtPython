import { getAllLeagues} from "../actions"


export const fetchLeagues =()=>{
    return function(dispatch) {
        fetch(`http://127.0.0.1:8000/api/leagues/`)
            .then(response => response.json())
            .then(json => dispatch(getAllLeagues(json)))
    }
}

