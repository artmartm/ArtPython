import React from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Nav from "./components_two/nav";
import Leagues from "./components_two/leagues/leagues";
import LeagueDetail from "./components_two/leagues/leagueDetail";
import Teams from "./components_two/teams/teams";
import TeamDetail from "./components_two/teams/teamDetail";
import Players from "./components_two/players/players";
import PlayerDetail from "./components_two/players/playerDetail";
import News from "./components_two/general/news";
import ListOfStadiums from "./components_two/general/stadium";
import Registration from "./components_two/users/registration";
import LogIn from "./components_two/users/login";
import About from "./components_two/general/about";
import Login from "./components/login/Login";
import AddGame from "./components_two/teams/addGame";
import Games from "./components_two/teams/gamesList";
//COMMENTS
import AddComment from "./components_two/general/comments/addComment";
import CommentsList from "./components_two/general/comments/commentsList";
//LOCATIONS
import AddCity from "./components_two/general/locations/cities";
import AddCountry from "./components_two/general/locations/countries";

function App() {

    return(
       <Router>
            <div className="App">
            <Nav />
                <Switch>
                    <Route path ='/' exact component={Home} />
                    <Route path='/add-comment' exact component={AddComment}/>
                    <Route path='/list-of-comments' exact component={CommentsList}/>

                    <Route path='/add-city' exact component={AddCity}/>
                    <Route path='/add-country' exact component={AddCountry}/>
                    
                    <Route path='/l' exact component={Login}/>
                    <Route path='/add-game' exact component={AddGame}/>
                    <Route path='/games-list' exact component={Games}/>
                    <Route path='/about' exact component={About}/>
                    <Route path='/login' exact component={LogIn} />
                    <Route path='/reg' exact component={Registration}/>
                    <Route path='/add-city' exact component={AddCity}/>
                    <Route path ='/news' exact component={News} />
                    <Route path='/leagues' exact component={Leagues} />
                    <Route path='/leagues/:id' exact component={LeagueDetail} />
                    <Route path='/teams' exact component={Teams} />
                    <Route path='/teams/:id' exact component={TeamDetail} />
                    <Route path='/players' exact component={Players} />
                    <Route path='/players/:id' exact component={PlayerDetail} />
                    <Route path='/stadiums' exact component={ListOfStadiums} />
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
  return(
    <div>
      <h1>home page</h1>
    </div>
  )
}

export default App;
