import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './../../../css/general/news.css';

function ParticularNewsList({ obj, ct, show }) {

    const [news, setNews] = useState([]);
    const particular_news = [];
    const latest_news = [];

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://127.0.0.1:8000/api/news/",
            mode: "no-cors"
        }).then(response => {
            setNews(response.data)
        })
    }, [])

    news.length ?
        news.map(e => (
            <div>
                {e.object_id == obj && e.content_type == ct ?
                    <div>
                        {particular_news.push(e)}
                        {latest_news.length < 1 ? latest_news.push(e) : <></>}
                    </div>
                    :
                    <p></p>
                }
            </div>
        )) : <p>no news yet</p>

    return (
        <div>
            {show ?
                <div>
                    {
                        latest_news.length ?
                            latest_news.map(e => (
                                <div>
                                    <div className='one-news-container'>
                                        <p className='for-inside-p'>{e.name}</p>
                                        <p>{e.body}</p>
                                        <Link className='news-link'
                                            key={e.id}
                                            to={{ pathname: `/news/${e.id}/`, fromDashboard: false }}>
                                            <p className='for-inside-p'>detail</p>
                                        </Link>
                                    </div>

                                </div>
                            )) :
                            <p>no news</p>
                    }
                </div>
                :
                <div>
                    {
                        particular_news.length ?
                            particular_news.map(e => (
                                <div>
                                    <Link className='news-link'
                                        key={e.id}
                                        to={{ pathname: `/news/${e.id}/`, fromDashboard: false }}>
                                        <div className='one-news-container'>
                                            <h3 className='for-inside-p'>{e.name}</h3>
                                            <p>{e.body}</p>
                                        </div>
                                    </Link>
                                    < hr />

                                </div>
                            )) :
                            <p>no news</p>
                    }
                </div>}
        </div>
    )
}

export default ParticularNewsList;