import './App.css';
import React from 'react';
import { AuthService } from './Services/AuthService';
import PrivateRoute from './Components/Auth/PrivateRoute';
import Home from './Components/Home';
import Login from './Components/Auth/Login';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';


class App extends React.Component {
  
  render() {
    const authService = new AuthService();
    const isLoggedIn = authService.isLoggedIn();

    return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home"/>
          </Route>
          <PrivateRoute isLoggedIn={isLoggedIn} path="/home" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>)
  };
}

export default App;
