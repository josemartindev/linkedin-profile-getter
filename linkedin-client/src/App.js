import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './components/Home';
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';

const history = createBrowserHistory();

class App extends Component {
    render () {
	return (
	  <Router history={history}>
  	    <Switch>
  	      <Route exact path="/home" component={Home}/>
	      <Route exact path="/auth/linkedin/callback" component={LinkedInPopUp} />
	      <Route path="/" component={Home}/>
  	    </Switch>
	  </Router>
	);
    }
}

export default App;
