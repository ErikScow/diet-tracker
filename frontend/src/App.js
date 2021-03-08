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
import About from './components/about/About'
import Registration from './components/registration/Registration';
import Dashboard from './components/dashboard/Dashboard';
import UserInfo from './components/userInfo/UserInfo';
import Historical from './components/historical/Historical';
import { Typography } from '@material-ui/core';

function App() {
  return (
    <Router>
      <div className="App">
        <div className='content-container'>
          <Switch>
            <Route exact path='/' component={Welcome} /> 
            <Route path='/about' component={About} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Registration} />
            <PrivateRoute path='/dashboard' component={Dashboard} />
            <PrivateRoute path='/userinfo' component={UserInfo} />
            <PrivateRoute path='/historical' component={Historical} />
          </Switch>
        </div>
      

      <div className='footer-container'>
                <footer>
                    
                    <div className='personal-links footer-links-container'>
                        <Typography>PERSONAL LINKS:</Typography>
                        <a className='footer-links' href='https://github.com/ErikScow' target="_blank">Github</a>
                        <a className='footer-links' href='https://www.linkedin.com/in/erik-scow-134b8116b' target="_blank">LinkedIn</a>
                        <a className='footer-links' href='https://erikscow.com' target='_blank'>Portfolio</a>
                    </div>
                    <div className='project-links footer-links-container'>
                        <Typography>PROJECT LINKS:</Typography>
                        <a className='footer-links' href='https://github.com/ErikScow/diet-tracker' target="_blank">Project Repo</a>
                        <a className='footer-links' href='' target="_blank"></a>
                    </div>
                    <div className='contact-links footer-links-container'>
                        <Typography>CONTACT:</Typography>
                        <a className='footer-links' href='mailto: erikscow@gmail.com'>Email</a>
                    </div>
                    
                </footer>
            </div>
        </div>
    </Router>
    
  );
}

export default App;
