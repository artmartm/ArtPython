import { getAllNews } from "../actions"


export const fetchNews =()=>{
    return function(dispatch) {
        fetch(`http://127.0.0.1:8000/api/news/`)
            .then(response => response.json())
            .then(json => dispatch(getAllNews(json)))
    }
}

