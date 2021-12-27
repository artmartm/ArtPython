import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../general/base/AuthContext";
import axios from "axios";
import ParticularNewsList from "../../general/news/particularNewsList";
import { useSelector } from "react-redux";
import ParticularTeamGame from "../../teams/games/particularTeamGame";

function Dashboard() {
    let { user, authTokens, logoutUser } = useContext(AuthContext)

    let history = useHistory();
    const teams = useSelector(state => state.teamsReducer.teams)

    const [profiles, setProfiles] = useState([]);

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('');

    const [my, setMy] = useState({});

    useEffect(() => {
        GetProfiles()
    }, [])


    let GetProfiles = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/users-profile/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()

        if (response.status === 200) {
            setProfiles(data)
        }//else if(response.statusText === 'Unauthorized'){
        //logoutUser()
        //}
    }
    const content_type = '14';

    const my_id = 0;

    const [showNews, setShowNews] = useState([{
        isOpen: false
    }])
    const [showLatestNews, setLatestShowNews] = useState(true);
    const [showMatches, setShowMatches] = useState([{
        isOpen: false
    }])
    const [show, setShow] = useState(true);

    /////
    const UpdateAccount = async () => {
        let formField = new FormData()

        await axios({
            method: 'post',
            url: `http://127.0.0.1:8000/api/users-profile/${my_id}`,
            data: formField
        }).then(response => {
            console.log(response.data);
            setMy(response.data)
            // history.push('/')
        })
    }

    return (
        <div>
            <h1>Hello, {user.username}</h1>
            <h2>this is your dashboard</h2>
            {user.admin ? <h2>you are admin</h2> : <></>}
            {teams.length > 0 && user.info.favorite_team ?
               <div>
               <div className='news-games-container'>
                    <div className='news-container'>
                        <h1 className='inside-news-container'>Team's news</h1>
                        <React.Fragment>
                            <button onClick={() => { setShowNews({ isOpen: true }); setLatestShowNews(false) }}>show all news</button>
                            {showLatestNews ? <ParticularNewsList key={user.info.favorite_team} obj={user.info.favorite_team} show={showLatestNews} ct={content_type} /> : <></>}
                            {showNews.isOpen &&
                                <div>
                                    <ParticularNewsList key={user.info.favorite_team} obj={user.info.favorite_team} show={showLatestNews} ct={content_type} />
                                    <button onClick={() => { setShowNews({ isOpen: false }); setLatestShowNews(true) }}>close</button>
                                </div>
                            }
                        </React.Fragment>
                    </div>
                    <div>
                        <div className='games-container'>
                            <h1 className='inside-game-container'>games</h1>
                            <React.Fragment>
                                <button onClick={() => { setShowMatches({ isOpen: true }); setShow(false) }}>show all matches</button>
                                {show ? <ParticularTeamGame show={show} team={user.info.favorite_team} /> : <></>}
                                {showMatches.isOpen &&
                                    <div>
                                        <ParticularTeamGame show={show} team={user.info.favorite_team} />
                                        <button onClick={() => { setShowMatches({ isOpen: false }); setShow(true) }}>close</button>
                                    </div>
                                }
                            </React.Fragment>
                        </div>
                    </div>
                </div>
                <h2> your favorite team is<Link className={'link'} key={user.info.favorite_team} to={`/teams/${user.info.favorite_team}`}>{teams[user.info.favorite_team-1].name}</Link></h2>
                </div>
                : <></>
            }
        </div>
    )
}

export default Dashboard;