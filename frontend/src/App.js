import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";
import Footer from "./components/common/Footer";
import Welcome from "./components/welcome/Welcome";
import Login from "./components/login/Login";
import About from "./components/about/About";
import Registration from "./components/registration/Registration";
import Dashboard from "./components/dashboard/Dashboard";
import Historical from "./components/historical/Historical";
import { Typography } from "@material-ui/core";
import Nav from "./components/common/Nav/Nav";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <div className="content-container">
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Registration} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Switch>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
