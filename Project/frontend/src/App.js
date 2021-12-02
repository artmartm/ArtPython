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
//import Registration from "./components_two/register";
import News from "./components_two/news";
//import Add from "./components_two/add";
import NameForm from "./components_two/register_2";
import Home from "./components_two/home";
import ListOfStadiums from "./components_two/stadium";

function App() {

   {/* function addToDo(title) {
        setTodos(todos.concat([{
          title:title,
          id: Date.now(),
          completed: false
        }]))
      }
    */}
    return(
       <Router>
            <div className="App">
            <NameForm />
            <Nav />
                <Switch>
                    <Route path ='/' exact component={Home} />
                    {/*<Route path ='/registration' exact component={Registration} />*/}
                    <Route path ='/news' exact component={News} />
                    <Route path='/leagues' exact component={Leagues} />
                    <Route path='/leagues/:id' exact component={LeagueDetail} />
                    <Route path='/teams' exact component={Teams} />
                    <Route path='/teams/:id' exact component={TeamDetail} />
                    <Route path='/players' exact component={Players} />
                    <Route path='/players/:id' exact component={PlayerDetail} />
                    <Route path='/stadium' exact component={ListOfStadiums} />
                    {/*<Route path='/add' exact component={Add} /> */}
                    {/*<Route path='' exact component={Add} /> */}
                    {/* <Add onCreate={addToDo} /> */}
                </Switch>
            </div>
        </Router>
    );
}


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


{/*    function addToDo(title) {
        setTodos(todos.concat([{
          title:title,
          id: Date.now(),
          completed: false
        }]))
      } */}
