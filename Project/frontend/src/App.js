import React, { useState, useEffect } from "react";
//import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import axios from "axios";

import LeagueDetail from "./components/leagues/leagueDetail";
import About from "./components/general/about";
//COMMENTS
//LOCATIONS
import AddCity from "./components/general/locations/cities";
import AddCountry from "./components/general/locations/countries";
//NAVIGATION
import Navigation from "./components/general/navigation";
//LOGIN LOGOUT SIGNUP

//import LogIn from "./components_two/users/login";
// GAMES
import AddGame from "./components/teams/games/addGame";
import Games from "./components/teams/games/gamesList";
import GameDetail from "./components/teams/games/gameDetail";
// STADIUMS
// PLAYERS
import Players from "./components/players/playerFE";
import PlayerDetail from "./components/players/playerDetail";
//TEAMS
import TeamDetail from "./components/teams/teams/teamDetail";
import TeamDetail2 from "./components/teams/teams/teamDetail2";

import StadiumDetail from "./components/teams/stadiums/stadiumDetail";
//NEWS
import NewsList from "./components/general/news/newsList";
import CommentDetail from "./components/general/comments/commentDetail";
//import { red } from "@material-ui/core/colors";
//GENERAL and BASE
import Home from "./components/general/home";
import { AuthProvider } from "./components/general/base/AuthContext";
import  PrivateRoute  from "./components/general/base/privaterouter";
import  Header  from "./components/general/base/header";
import  LoginPage  from "./components/users/login/logIn";
import teamsList from "./components/teams/teams/teamsList";
import { fetchTeams } from "./redux_two/actions/asyncActions/asyncAllTeams";

//REDUX
import {useDispatch, useSelector} from 'react-redux';
import PlayersList from "./components/players/playersList";
import { fetchPlayers } from "./redux_two/actions/asyncActions/asyncAllPlayers";
import LeaguesList from "./components/leagues/leaguesList";
import { fetchLeagues } from "./redux_two/actions/asyncActions/asyncAllLeagues";
import StadiumsList from "./components/teams/stadiums/stadiumsList";
import { fetchStadiums } from "./redux_two/actions/asyncActions/asyncAllStadiums";
import { fetchNews } from "./redux_two/actions/asyncActions/asyncAllNews";
import AllCommentsLis from "./components/general/comments/allComments";
import AllCommentsList from "./components/general/comments/allComments";
import { fetchComments } from "./redux_two/actions/asyncActions/asyncAllComments";
/////
import { syncHistoryWithStore } from 'react-router-redux';
import { HashRouter } from 'react-router-dom';
import UserList from "./components/users/usersList";
import UserDetail from "./components/users/userDetail";
import NewsDetail from "./components/general/news/newsDetail";
import UsersProfilesList from "./components/users/usersProfilesList";
import UserProfileDetail from "./components/users/userProfileDetail";
import Dashboard from "./components/users/dashboard/dashboard";
import SuccessfulLogIn from "./components/users/successfulPages/successfulLogin";
import SignUp from "./components/users/signup/signUp";
import Update from "./components/general/comments/update";
import Tournamnet from "./components/teams/tournament/tournament";

function App() {

    //const history = syncHistoryWithStore(HashRouter, store)

    const dispatch = useDispatch();
    //get teams
    useEffect(()=> {
        dispatch(fetchTeams())
        dispatch(fetchPlayers())
        dispatch(fetchLeagues())
        dispatch(fetchStadiums())
        dispatch(fetchNews())
        dispatch(fetchComments())
    }, [])

    {/*useEffect(()=> {
        dispatch(fetchUsers())
    }, []) */}
    return(
       <Router>
            <div className="App">
                <AuthProvider>
                <Header/>
                {/*<Switch>
                <Navigation />*/}
                    <Route path ='/' exact component={Home} />
                    <Route path ='/tournament' exact component={Tournamnet} />
                    <Route path='/comments/:id' exact component={CommentDetail}/>
                    <Route path='/add-country' exact component={AddCountry}/>
                    <Route path='/teams' exact component={teamsList}/>
                    <Route path='/users' exact component={UserList}/>
                    <Route path='/users/:id' exact component={UserDetail}/>
                    <Route path='/profiles' exact component={UsersProfilesList}/>
                    <Route path='/profiles/:id' exact component={UserProfileDetail}/>
                    <Route path='/leagues' exact component={LeaguesList}/>
                    <Route path='/players' exact component={PlayersList}/>
                    <Route path='/add-game' exact component={AddGame}/>
                    <Route path='/games-list' exact component={Games}/>
                    <Route path='/game/:id' exact component={GameDetail}/>
                    <Route path='/about' exact component={About}/>
                    <Route path='/login' exact component={LoginPage} />
                    <Route path='/signup' exact component={SignUp}/>
                    <Route path='/dashboard' exact component={Dashboard}/>
                    <Route path='/add-city' exact component={AddCity}/>
                    <Route path ='/news' exact component={NewsList} />
                    <Route path ='/news/:id' exact component={NewsDetail} />
                    <Route path='/leagues/:id' exact component={LeagueDetail} /> {/*PrivateRoute*/}
                    <Route path='/teams/:id' exact component={TeamDetail} />
                    <Route path='/successful-login' component={SuccessfulLogIn}/>
                    {/*<Route path='/teams2/:id' exact component={TeamDetail2} />*/}
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
