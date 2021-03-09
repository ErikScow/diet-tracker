import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Nav from '../common/Nav'

import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    card: {
        padding: '10px'
    },
    image: {
        width: '90%',
        margin: '0 auto'
    },
    firstBox: {
        height: '150px',
        border: '1px solid grey',
        borderRadius: '10px',
        padding: '20px',
        marginTop: '20px'
    },
    firstBoxText: {
        margin: 'auto'
    }
  }));
function Welcome(props) {
    
    const classes = useStyles()
    const history = useHistory()
    useEffect(()=> {
        let mounted = true
        if (mounted){
            const token = localStorage.getItem('token')
            if (token) {
                history.push('/dashboard')
            }
        };
        return function cleanup() {
            mounted = false
        }
    },[])

    return (
        <div>
            <Nav />
            <Grid container direction='row'>
                <Grid item xs={1}></Grid>
                <Grid item container xs={10}>
                    <Grid item container direction='column' className={classes.firstBox}>
                        <Typography variant='h5' className={classes.firstBoxText}>Landing Page in development</Typography>
                    </Grid>
                    
                   
                    
                </Grid>
                <Grid item xs={1} md={2}></Grid>
            </Grid>
        </div>
    );
}

export default Welcome;