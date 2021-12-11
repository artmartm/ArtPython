import React from "react";

import {BrowserRouter as Router, Route} from 'react-router-dom';
import HomePage from "./home";
import LoginPage from "./loginpage";
import Header from "./header";
import PrivateRoute from "./privateRouter";
import {AuthProvider} from './authContext';

function App2Page() {
    return(
        <div>
            <h1>for login</h1>
            <Router>
                <AuthProvider>
                    <Header/>
                    <PrivateRoute component={HomePage} path='/'/>
                    <Route component={LoginPage} path='/login'/>
                </AuthProvider>
            </Router>
        </div>
    )
}
export default App2Page;