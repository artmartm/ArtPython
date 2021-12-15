import React, { useState, useEffect } from "react";
//import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import axios from "axios";

import Leagues from "./components/leagues/leagues";
import LeagueDetail from "./components/leagues/leagueDetail";
import About from "./components/general/about";
//COMMENTS
//LOCATIONS
import AddCity from "./components/general/locations/cities";
import AddCountry from "./components/general/locations/countries";
//NAVIGATION
import Navigation from "./components/general/navigation";
//LOGIN LOGOUT SIGNUP
import Registration from "./components/users/signUp.js/registration";
//import LogIn from "./components_two/users/login";
// GAMES
import AddGame from "./components/teams/games/addGame";
import Games from "./components/teams/games/gamesList";
import GameDetail from "./components/teams/games/gameDetail";
// STADIUMS
import ListOfStadiums from "./components/teams/stadiums/stadium";
// PLAYERS
import Players from "./components/players/playerFE";
import PlayerDetail from "./components/players/playerDetail";
//TEAMS
import TeamDetail from "./components/teams/teams/teamDetail";
import StadiumDetail from "./components/teams/stadiums/stadiumDetail";
//NEWS
import NewsList from "./components/general/news/news";
import CommentDetail from "./components/general/comments/commentDetail";
//import { red } from "@material-ui/core/colors";
//GENERAL and BASE
import Home from "./components/general/home";
import { AuthProvider } from "./components/general/base/AuthContext";
import  PrivateRoute  from "./components/general/base/privaterouter";
import  Header  from "./components/general/base/header";
import  LoginPage  from "./components/users/login/logIn";
import teamsList from "./components/teams/teams/teamsList";
import { fetchTeams } from "./redux_two/actions/asyncActions/asynAllTeams";

//REDUX
import {useDispatch, useSelector} from 'react-redux';
import PlayersList from "./components/players/playersList";
import { fetchPlayers } from "./redux_two/actions/asyncActions/asyncAllPlayers";

function App() {

    const dispatch = useDispatch();
    //get teams
    useEffect(()=> {
        dispatch(fetchTeams())
    }, [])
    //get players
    useEffect(()=> {
        dispatch(fetchPlayers())
    }, [])
    
    return(
       <Router>
            <div className="App">
                <AuthProvider>
                <Header/>
                {/*<Switch>
                <Navigation />*/}
                    <Route path ='/' exact component={Home} />
                    <Route path='/comments/:id' exact component={CommentDetail}/>
                    <Route path='/add-country' exact component={AddCountry}/>
                    <Route path='/teams' exact component={teamsList}/>
                    <Route path='/players' exact component={PlayersList}/>
                    <Route path='/add-game' exact component={AddGame}/>
                    <Route path='/games-list' exact component={Games}/>
                    <Route path='/game/:id' exact component={GameDetail}/>
                    <Route path='/about' exact component={About}/>
                    <Route path='/login' exact component={LoginPage} />
                    <Route path='/reg' exact component={Registration}/>
                    <Route path='/add-city' exact component={AddCity}/>
                    <Route path ='/news' exact component={NewsList} />
                    <Route path='/leagues' exact component={Leagues} />
                    <Route path='/leagues/:id' exact component={LeagueDetail} /> {/*PrivateRoute*/}
                    <Route path='/teams/:id' exact component={TeamDetail} />
                    <Route path='/players/:id' exact component={PlayerDetail} />
                    <Route path='/stadiums' exact component={ListOfStadiums} />
                    <Route path='/stadium/:id' exact component={StadiumDetail} />
                {/*</Switch>*/}
                </AuthProvider>
            </div>
        </Router>
    );
}
export default App;
