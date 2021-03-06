import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, AppBar, Toolbar, Button, Menu,  IconButton, Drawer } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import { deAuthenticate } from '../../state/userSlice'

const useStyles = makeStyles(theme => ({
    link: {
        textDecoration: 'none',
    },
    logoutButton: {

    },
    linksContainer: {
        
    },
    navContentContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}))

function MobileNav() {
    const history = useHistory()
    const dispatch = useDispatch()
    const loggedIn = useSelector((state) => state.userSlice.authenticated)

    const classes = useStyles()

    const [drawerOpen, setDrawerOpen] = useState(false)

    const toggleDrawer = () => {
        if (drawerOpen){
            setDrawerOpen(false)
        } else {
            setDrawerOpen(true)
        }
    }

    const logOut = () => {
        localStorage.removeItem('token')
        dispatch(deAuthenticate())
        history.push('/')
    }

    if (loggedIn){
        return (
            <AppBar position='static'>
                <Toolbar className={classes.navContentContainer}>
                        <Typography variant='h6'>
                            Diet Journal
                        </Typography>
                        <div className={classes.linksContainer}>
                            <IconButton onClick={toggleDrawer}><MenuIcon/></IconButton>
                            <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer}>
                                <Link to='/dashboard' className={classes.link}><Button>Dashboard</Button></Link>
                                <Link to='/userinfo' className={classes.link}><Button>User Info</Button></Link>
                                <Link to='/historical' className={classes.link}><Button>Historical</Button></Link>
                                <Button onClick={logOut} className={classes.logoutButton}>Logout</Button>
                            </Drawer>
                                
                          
                        </div>
                </Toolbar>
            </AppBar>
        )
    }
    return (
        <AppBar position='static'>
            <Toolbar className={classes.navContentContainer}>
                <Typography variant='h6'>
                    Diet Journal
                </Typography>
                <div className={classes.linksContainer}>
                    <Link to='/login' className={classes.link}><Button>Login</Button></Link>
                    <Link to='/register' className={classes.link}><Button>Sign Up</Button></Link>
                </div>
            </Toolbar>
           
        </AppBar>
    )
}

export default MobileNav
