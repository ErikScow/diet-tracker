import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route, 
} from 'react-router-dom'
import Welcome from './components/welcome/Welcome';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import Dashbaord from './components/dashboard/Dashbaord';
import UserInfo from './components/userInfo/UserInfo';
import Historical from './components/historical/Historical';

function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
        <Route exact path='/' component={Welcome} /> 
        <Route path='/login' component={Login} />
        <Route path='/register' component={Registration} />
        <Route path='/dashboard' component={Dashbaord} />
        <Route path='/userinfo' component={UserInfo} />
        <Route path='/historical' component={Historical} />
      </Switch>
      </div>
    </Router>
    
  );
}

export default App;
