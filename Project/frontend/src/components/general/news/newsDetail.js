import axios from "axios";
import React, {useState, useEffect} from "react";

function NewsDetail({ match }) {
    const[state, setState] = useState([{
        isOpen:false
    }])
    const[news, setNews] = useState({});

    const id = match.params.id;

    useEffect(()=>{
        axios({
            method:'GET',
            url:`http://127.0.0.1:8000/api/news/${id}`,
        }).then(response=>{
            setNews(response.data)
        })
    },[id])


    return(
        <div>
            <h1>{news.name}</h1>
            <h2>author is {news.author}</h2>
            <h3>created at {news.created_at}</h3>
            <h4>body: {news.body}</h4>
        </div>
    )
}

export default NewsDetail;

{/*}
import { fetchParticularUser } from "../../../redux_two/actions/asyncActions/asyncParticularUser";

const dispatch = useDispatch();
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

useEffect(()=> {
    dispatch(fetchParticularUser())
}, []) 
*/}