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
import Loader from "../../general/loader";
import ChangeTeam from "../changeTeam";

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
                                        <ParticularNewsList key={part[0].favorite_team} obj={part[0].favorite_team} ct={content_type} />
                                            <ParticularTeamGame team={part[0].favorite_team} />
                                    </div>
                                    <div className='simple-dashboard'>
                                        <h1>your favorite team is</h1>
                                        <Link className={'link'} key={part[0].favorite_team - 1} to={`/teams/${part[0].favorite_team}`}>
                                            <img src={teams[part[0].favorite_team - 1].team_logo} className='stadium_main_img' />
                                        </Link>
                                        {/*<ChangeTeam obj={user.user_id} f_t={part[0].favorite_team} id={part[0].id}/>*/}
                                        {user.admin ?
                                            <div>
                                                <h2><Link className='link-dashboard' to={'/users'}>see all users</Link></h2>
                                            </div>
                                            : <></>}
                                    </div>
                                </div>
                            </div>
                            : <Loader />
                        }
                    </div> : <SetUpTeam obj={user.user_id} />}
            </div>
        </div>
    )
}

export default Dashboard;

