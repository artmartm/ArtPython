import { getAllStadiums } from "../actions"


export const fetchStadiums =()=>{
    return function(dispatch) {
        fetch(`http://127.0.0.1:8000/api/stadiums/`)
            .then(response => response.json())
            .then(json => dispatch(getAllStadiums(json)))
    }
}

