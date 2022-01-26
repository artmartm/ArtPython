import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './../../../css/general/news.css';
import AuthContext from '../base/AuthContext';
import { Button } from "@mui/material";

function ParticularNewsList({ obj, ct }) {
    let { user, authTokens } = useContext(AuthContext)

    const [show,setShow] = useState({isOpen:true})

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
        <div className='news-container'>
        <h1 className='inside-news-container'>Team's news</h1>
            <React.Fragment>
            <Button onClick={() => { setShow({ isOpen: false }) }}>show all news</Button>
            <div>
            {show.isOpen ?
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
                            <div>
                                <p>no news yet</p>
                            </div>
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
                            <Button onClick={() => { setShow({ isOpen: true }) }}>close</Button>

                </div>}
                </div>
                </React.Fragment>
        </div>
    )
}

export default ParticularNewsList;

