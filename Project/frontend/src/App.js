import React, { useState } from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import axios from "axios";

import Leagues from "./components_two/leagues/leagues";
import LeagueDetail from "./components_two/leagues/leagueDetail";
import About from "./components_two/general/about";
//COMMENTS
import AddComment from "./components_two/general/comments/addComment";
import CommentsList from "./components_two/general/comments/commentsList";
//LOCATIONS
import AddCity from "./components_two/general/locations/cities";
import AddCountry from "./components_two/general/locations/countries";
//NAVIGATION
import Navigation from "./components_two/general/navigation";
//LOGIN LOGOUT SIGNUP
import Registration from "./components_two/users/registration";
import LogIn from "./components_two/users/login";
// GAMES
import AddGame from "./components_two/teams/games/addGame";
import Games from "./components_two/teams/games/gamesList";
import GameDetail from "./components_two/teams/games/gameDetail";
// STADIUMS
import ListOfStadiums from "./components_two/teams/stadiums/stadium";
// PLAYERS
import Players from "./components_two/players/players";
import PlayerDetail from "./components_two/players/playerDetail";
//TEAMS
import Teams from "./components_two/teams/teams/teams";
import TeamDetail from "./components_two/teams/teams/teamDetail";
import StadiumDetail from "./components_two/teams/stadiums/stadiumDetail";
//NEWS
import NewsList from "./components_two/general/news/news";
import CommentDetail from "./components_two/general/comments/commentDetail";
//import { red } from "@material-ui/core/colors";
//GENERAL
import Home from "./components_two/general/home";
import App2Page from "./components/pages/APP2";


function App() {

    
    return(
       <Router>
            <div className="App">
                <App2Page/>
              <Navigation />
                <Switch>
                    <Route path ='/' exact component={Home} />
                    <Route path='/add-comment' exact component={AddComment}/>
                    <Route path='/list-of-comments' exact component={CommentsList}/>
                    <Route path='/comments/:id' exact component={CommentDetail}/>
                    <Route path='/add-city' exact component={AddCity}/>
                    <Route path='/add-country' exact component={AddCountry}/>
                    <Route path='/add-game' exact component={AddGame}/>
                    <Route path='/games-list' exact component={Games}/>
                    <Route path='/game/:id' exact component={GameDetail}/>
                    <Route path='/about' exact component={About}/>
                    <Route path='/login' exact component={LogIn} />
                    <Route path='/reg' exact component={Registration}/>
                    <Route path='/add-city' exact component={AddCity}/>
                    <Route path ='/news' exact component={NewsList} />
                    <Route path='/leagues' exact component={Leagues} />
                    <Route path='/leagues/:id' exact component={LeagueDetail} />
                    <Route path='/teams' exact component={Teams} />
                    <Route path='/teams/:id' exact component={TeamDetail} />
                    <Route path='/players' exact component={Players} />
                    <Route path='/players/:id' exact component={PlayerDetail} />
                    <Route path='/stadiums' exact component={ListOfStadiums} />
                    <Route path='/stadium/:id' exact component={StadiumDetail} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
