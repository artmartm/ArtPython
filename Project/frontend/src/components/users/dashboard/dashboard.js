import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../general/base/AuthContext";
import ParticularNewsList from "../../general/news/particularNewsList";
import { useDispatch, useSelector } from "react-redux";
import ParticularTeamGame from "../../teams/games/particularTeamGame";
import './../../../css/users/login/dashboard.css';
import { FetchUsersSpecialFields } from "../../../redux/actions/asyncActions/asyncAllUsersSpecialFields";
import SetUpTeam from "../setUpteam";
import { Button } from "@mui/material";

function Dashboard() {
    let { user } = useContext(AuthContext)

    const teams = useSelector(state => state.teamsReducer.teams)
    const profiles = useSelector(state => state.usersProfilesReducer.usersProfiles)


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(FetchUsersSpecialFields())
    }, [])

    const special = useSelector(state => state.usersSpecialFieldsReducer.usersSpecialFields)


    const content_type = '14';

    const [showNews, setShowNews] = useState([{
        isOpen: false
    }])
    const [showLatestNews, setLatestShowNews] = useState(true);
    const [showMatches, setShowMatches] = useState([{
        isOpen: false
    }])
    const [show, setShow] = useState(true);

    const part = []

    {
        profiles.map(e => {
            if (e.user == user.user_id)
                part.push(e)
        })
    }

    return (
        <div className='single-news-container'>
            <div>
                <h1>Hello, {user.username}</h1>
                <h2>this is your dashboard</h2>
                {user.user_id && part.length > 0 ?
                    <div>
                        {user.admin ? <h2>you are admin</h2> : <></>}
                        {user.moderator ? <h2>you are moderator</h2> : <></>}
                        {teams.length > 0 && part.length > 0 ?
                            <div>
                                <div className='main-dashboard'>
                                    <div className='news-games-container'>
                                        <div className='news-container'>
                                            <h1 className='inside-news-container'>Team's news</h1>
                                            <React.Fragment>
                                                <Button onClick={() => { setShowNews({ isOpen: true }); setLatestShowNews(false) }}>show all news</Button>
                                                {showLatestNews ? <ParticularNewsList key={part[0].favorite_team - 1} obj={part[0].favorite_team} show={showLatestNews} ct={content_type} /> : <></>}
                                                {showNews.isOpen &&
                                                    <div>
                                                        <ParticularNewsList key={part[0].favorite_team} obj={part[0].favorite_team} show={showLatestNews} ct={content_type} />
                                                        <Button onClick={() => { setShowNews({ isOpen: false }); setLatestShowNews(true) }}>close</Button>
                                                    </div>
                                                }
                                            </React.Fragment>
                                        </div>
                                        <div>
                                            <div className='games-container'>
                                                <h1 className='inside-game-container'>games</h1>
                                                <React.Fragment>
                                                    <Button onClick={() => { setShowMatches({ isOpen: true }); setShow(false) }}>show all matches</Button>
                                                    {show ? <ParticularTeamGame show={show} team={part[0].favorite_team} /> : <></>}
                                                    {showMatches.isOpen &&
                                                        <div>
                                                            <ParticularTeamGame show={show} team={part[0].favorite_team} />
                                                            <Button onClick={() => { setShowMatches({ isOpen: false }); setShow(true) }}>close</Button>
                                                        </div>
                                                    }
                                                </React.Fragment>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='simple-dashboard'>
                                        <h1>your favorite team is</h1>
                                        <Link className={'link'} key={part[0].favorite_team - 1} to={`/teams/${part[0].favorite_team}`}>
                                            <img src={teams[part[0].favorite_team - 1].team_logo} className='stadium_main_img' />
                                        </Link>
                                        {user.admin ?
                                            <div>
                                                <h2><Link className='link-dashboard' to={'/users'}>see all users</Link></h2>
                                            </div>
                                            : <></>}
                                    </div>
                                </div>
                            </div>
                            : <></>
                        }
                    </div> : <SetUpTeam obj={user.user_id} />}
            </div>
        </div>
    )
}

export default Dashboard;

