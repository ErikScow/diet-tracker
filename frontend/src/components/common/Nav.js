import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, AppBar, Toolbar, Button } from '@material-ui/core'

import { deAuthenticate } from '../../state/slice'

function Nav() {
    const history = useHistory()
    const dispatch = useDispatch()
    const loggedIn = useSelector((state) => state.slice.authenticated)

    const logOut = () => {
        localStorage.removeItem('token')
        dispatch(deAuthenticate())
        history.push('/')
    }

    if (loggedIn){
        return (
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6'>
                        Diet Journal
                    </Typography>
                    <Link to='/dashboard'><Button>Dashboard</Button></Link>
                    <Link to='/userinfo'><Button>User Info</Button></Link>
                    <Link to='/historical'><Button>Historical</Button></Link>
                    <Button onClick={logOut} >Logout</Button>
                </Toolbar>
            </AppBar>
        )
    }
    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6'>
                    Diet Journal
                </Typography>
                <Link to='/login'><Button>Login</Button></Link>
                <Link to='/register'><Button>Sign Up</Button></Link>
            </Toolbar>
           
        </AppBar>
    )
}

export default Nav
