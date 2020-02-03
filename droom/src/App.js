import React from 'react';
import {BrowserRouter as Router, Link, Switch } from 'react-router-dom'
import Welcome from './components/Welcome'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='signup' component={SignUp} />
          <Route path='/signin' component={SignIn} />
          <Route path='/' component={Welcome} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
