import React, { useState, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  Menu,
  IconButton,
  Drawer,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import { deAuthenticate } from "../../../state/userSlice";

function MobileNav() {
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.userSlice.authenticated);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

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
          <Link to="/dashboard">Dash</Link>
          <Link to="/about">About</Link>
          <Link to="/" onClick={logOut}>
            Logout
          </Link>
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

export default MobileNav;
