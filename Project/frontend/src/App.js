import React, { useState, useEffect } from "react";

import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LeagueDetail from "./components/leagues/leagueDetail";
//COMMENTS

//LOGIN LOGOUT SIGNUP

// GAMES
import AddGame from "./components/teams/games/addGame";
import Games from "./components/teams/games/gamesList";
import GameDetail from "./components/teams/games/gameDetail";
// STADIUMS
// PLAYERS
import PlayerDetail from "./components/players/playerDetail";
//TEAMS
import TeamDetail from "./components/teams/teams/teamDetail";

import StadiumDetail from "./components/teams/stadiums/stadiumDetail";
//NEWS
import CommentDetail from "./components/general/comments/commentDetail";
//GENERAL and BASE
import Home from "./components/general/home";
import { AuthProvider } from "./components/general/base/AuthContext";
import PrivateRoute from "./components/general/base/privaterouter";
import Header from "./components/general/base/header";
import LoginPage from "./components/users/login/logIn";
import teamsList from "./components/teams/teams/teamsList";
import { fetchTeams } from "./redux_two/actions/asyncActions/asyncAllTeams";

//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayers } from "./redux_two/actions/asyncActions/asyncAllPlayers";
import LeaguesList from "./components/leagues/leaguesList";
import { fetchLeagues } from "./redux_two/actions/asyncActions/asyncAllLeagues";
import StadiumsList from "./components/teams/stadiums/stadiumsList";
import { fetchStadiums } from "./redux_two/actions/asyncActions/asyncAllStadiums";
import { fetchNews } from "./redux_two/actions/asyncActions/asyncAllNews";
import AllCommentsList from "./components/general/comments/allComments";
import { fetchComments } from "./redux_two/actions/asyncActions/asyncAllComments";
/////

import UserList from "./components/users/usersList";
import UserDetail from "./components/users/userDetail";
import NewsDetail from "./components/general/news/newsDetail";
import UsersProfilesList from "./components/users/usersProfilesList";
import UserProfileDetail from "./components/users/userProfileDetail";
import Dashboard from "./components/users/dashboard/dashboard";
import SuccessfulLogIn from "./components/users/successfulPages/successfulLogin";
import SignUp from "./components/users/signup/signUp";
import Update from "./components/general/comments/update";
import PlayersTable from "./components/players/playersTable";
import TeamTable from "./components/teams/tournament/teamTable";

function App() {


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTeams())
        dispatch(fetchPlayers())
        dispatch(fetchLeagues())
        dispatch(fetchStadiums())
        dispatch(fetchNews())
        dispatch(fetchComments())
    }, [])


    return (
        <Router>
            <div className="App">
                <AuthProvider>
                    <Header />
                    {/*<Switch>
                <Navigation />*/}
                    <Route path='/' exact component={Home} />
                    <Route path='/tournament' exact component={TeamTable} />
                    <PrivateRoute path='/comments/:id' exact component={CommentDetail} />
                    <Route path='/teams' exact component={teamsList} />
                    <Route path='/users' exact component={UserList} />
                    <Route path='/users/:id' exact component={UserDetail} />
                    <Route path='/profiles' exact component={UsersProfilesList} />
                    <Route path='/profiles/:id' exact component={UserProfileDetail} />
                    <Route path='/leagues' exact component={LeaguesList} />

                    <Route path='/players' exact component={PlayersTable} />
                    <Route path='/add-game' exact component={AddGame} />
                    <Route path='/games-list' exact component={Games} />
                    <Route path='/game/:id' exact component={GameDetail} />
                    <Route path='/login' exact component={LoginPage} />
                    <Route path='/signup' exact component={SignUp} />
                    <Route path='/dashboard' exact component={Dashboard} />
                    <PrivateRoute path='/news/:id' exact component={NewsDetail} />
                    <Route path='/leagues/:id' exact component={LeagueDetail} /> 
                    <Route path='/teams/:id' exact component={TeamDetail} />
                    <Route path='/successful-login' component={SuccessfulLogIn} />
                    <Route path='/update/:id' exact component={Update} />
                    <Route path='/players/:id' exact component={PlayerDetail} />
                    <Route path='/stadiums' exact component={StadiumsList} />
                    <Route path='/all-comments' exact component={AllCommentsList} />
                    <Route path='/stadiums/:id' exact component={StadiumDetail} />
                    {/*</Switch>*/}
                </AuthProvider>
            </div>
        </Router>
    );
}
export default App;