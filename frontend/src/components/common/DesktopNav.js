import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, AppBar, Toolbar, Button } from '@material-ui/core'

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

function DesktopNav() {
    const history = useHistory()
    const dispatch = useDispatch()
    const loggedIn = useSelector((state) => state.userSlice.authenticated)

    const classes = useStyles()

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
                                <Link to='/dashboard' className={classes.link}><Button>Dashboard</Button></Link>
                                <Link to='/userinfo' className={classes.link}><Button>User Info</Button></Link>
                                <Link to='/historical' className={classes.link}><Button>Historical</Button></Link>
                                <Link to='/about' className={classes.link}><Button>About</Button></Link>
                                <Button onClick={logOut} className={classes.logoutButton}>Logout</Button>
                          
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
                    <Link to='/about' className={classes.link}><Button>About</Button></Link>
                    <Link to='/login' className={classes.link}><Button>Login</Button></Link>
                    <Link to='/register' className={classes.link}><Button>Sign Up</Button></Link>
                </div>
            </Toolbar>
           
        </AppBar>
    )
}

export default DesktopNav
