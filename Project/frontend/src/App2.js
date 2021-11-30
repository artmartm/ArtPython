import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home/home";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Root from "./Root";
import { ToastContainer } from "react-toastify";

class App extends Component {
  render() {
    return (
      <div>
        <Root>
        <ToastContainer hideProgressBar={true} newestOnTop={true} />
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route exact path="/" exact component={Home} />
          </Switch>
        </Root>
      </div>
    );
  }
}

export default App;