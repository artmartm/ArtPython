import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import Header from './header';
import HomePage from './homepage';
import LoginPage from './loginpage';

import PrivateRoute from './privaterouter';

function TA3() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header/>
          <h1>jhkjjk</h1>
          <PrivateRoute component={HomePage} path="/" exact/>
          <Route component={LoginPage} path="/login"/>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default TA3;