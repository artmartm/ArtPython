import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ParticularNewsList({ obj, ct }) {

    const [news, setNews] = useState([]);
    const particular_news = [];

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/api/news/",
            mode: "no-cors"
        }).then(response => {
            setNews(response.data)
        })
    }, [])

    {
        news.length ?
        news.map(e => (
            <div>
                {e.object_id == obj && e.content_type == ct ?
                    particular_news.push(e)
                    :
                    <p></p>
                }
            </div>
        )) : <p>no news yet</p>
    }

    return (
        <div>
            <h1>list of news</h1>
            <hr />
            {particular_news.length ?
                particular_news.map(e => (
                    <div>
                        <Link key={e.id} to={{ pathname: `/news/${e.id}/`, fromDashboard: false }}><h3>{e.name}...added{e.author}</h3></Link>
                    </div>
                )) :
                <p>no news</p>}
            <hr />
        </div>
    )
}

export default ParticularNewsList;