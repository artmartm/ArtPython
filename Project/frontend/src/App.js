import React from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Nav from "./components_two/nav";
import Leagues from "./components_two/leagues";
import LeagueDetail from "./components_two/leagueDetail";
import Teams from "./components_two/teams";
import TeamDetail from "./components_two/teamDetail";
import Players from "./components_two/players";
import PlayerDetail from "./components_two/playerDetail";
import News from "./components_two/news";
import ListOfStadiums from "./components_two/stadium";
import AddCountry from "./components_two/general/countries";
import Just from "./components_two/general/just";

function App() {

    return(
       <Router>
            <div className="App">
            <Nav />
                <Switch>
                    <Route path ='/' exact component={Home} />
                    <Route path='/add-country' exact component={AddCountry}/>
                    <Route path ='/news' exact component={News} />
                    <Route path='/leagues' exact component={Leagues} />
                    <Route path='/leagues/:id' exact component={LeagueDetail} />
                    <Route path='/teams' exact component={Teams} />
                    <Route path='/teams/:id' exact component={TeamDetail} />
                    <Route path='/players' exact component={Players} />
                    <Route path='/players/:id' exact component={PlayerDetail} />
                    <Route path='/stadium' exact component={ListOfStadiums} />
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
