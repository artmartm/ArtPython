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

function App() {
    return(
       <Router>
            <div className="App">
            <Nav />
                <Switch>
                    <Route path ='/' exact component={Home} />
                    <Route path='/leagues' exact component={Leagues} />
                    <Route path='/leagues/:id' exact component={LeagueDetail} />
                    <Route path='/team' exact component={Teams} />
                    <Route path='/team/:id' exact component={TeamDetail} />
                    <Route path='/player' exact component={Players} />
                    <Route path='/player/:id' exact component={PlayerDetail} />
                </Switch>
            </div>
        </Router>
    );
}

const Home = () => (
    <div>
        <h1>Home page</h1>
    </div>
)


export default App;

{/*                    <Route path='/leagues' exact component={Leagues} />
                    <Route path='/leagues/:id' exact component={LeagueDetail} />
                    <Route path='/about' component={About} />
                    <Route path='/teams'  exact component={Teams} />
                    <Route path='/teams/:id' component={Detail} />
<Route path='/players/:id' exact component={PostDetail} />
<Route path='/team' exact component={Teams} />
                    <Route path='/team/:id' exact component={TeamDetail} />*/
}


//import Navbar from './components/navbar';
//import CategoryDetail from './components/categorydetail';
//import PostDetail from './components/postdetail';
//import About from "./components/about";
//import Detail from "./components/Detail";
//import PostDetail from "./components/players";
//import Teams from "./components/teams";
//import LeagueDetail from "./components/leagueDetail";
