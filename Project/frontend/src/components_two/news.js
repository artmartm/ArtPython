import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Model.css';
import {Link} from 'react-router-dom';

function News() {
    
    const [news, setNews] = useState([]);

    useEffect( () => {
        axios({
            method:"GET",
            url:"http://127.0.0.1:8000/api/news/",
            mode: "no-cors"
        }).then(response => {
            setNews(response.data)
        })
    },[])
    return(
        <div>
            <h1>news page</h1>
            {news.map(e=>(
                <div>
                    <h2>{e.name}</h2>
                </div>
            ))}
        </div>
    )
}

export default News;