import './App.css';
import React from 'react';
import AuthService from './Services/AuthService';
import PrivateRoute from './Components/Auth/PrivateRoute';
import Home from './Components/Home';
import Login from './Components/Auth/Login';
import { Route, Switch, BrowserRouter as Router, Redirect, useHistory } from 'react-router-dom';
import Header from './Components/Header';


function App() {  
  const isLoggedIn = AuthService.isLoggedIn();
  let history = useHistory();

  return (
  <div className="App">
    <header className="App-header">
      <Header title="123"></Header>
    </header>
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home"/>
        </Route>
        <PrivateRoute isLoggedIn={isLoggedIn} path="/home" component={Home} />
        <Route path="/login" component={Login} history={history} />
      </Switch>
    </Router>
  </div>)
};


export default App;
