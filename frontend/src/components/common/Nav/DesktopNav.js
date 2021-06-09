import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Typography, AppBar, Toolbar, Button } from "@material-ui/core";

import { deAuthenticate } from "../../../state/userSlice";
import { Fragment } from "react";

function DesktopNav() {
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.userSlice.authenticated);

  const logOut = () => {
    localStorage.removeItem("token");
    dispatch(deAuthenticate());
    history.push("/");
  };

  if (loggedIn) {
    return (
      <Fragment>
        <h1>Diet Journal</h1>
        <div className="nav-links-container">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/userinfo">User Info</Link>
          <Link to="/historical">Historical</Link>
          <Link to="/about">About</Link>
          <Link onClick={logOut}>Logout</Link>
        </div>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <h1>Diet Journal</h1>
      <div className="nav-links-container">
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Sign Up</Link>
      </div>
    </Fragment>
  );
}

export default DesktopNav;
