import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route, 
} from 'react-router-dom'
import PrivateRoute from './components/common/PrivateRoute'
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
        <PrivateRoute path='/dashboard' component={Dashbaord} />
        <PrivateRoute path='/userinfo' component={UserInfo} />
        <PrivateRoute path='/historical' component={Historical} />
      </Switch>
      </div>
    </Router>
    
  );
}

export default App;
