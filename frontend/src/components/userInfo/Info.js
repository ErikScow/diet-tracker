import React from 'react' 
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    text: {
        color: '#757575',
        textAlign: 'left',
        margin: '20px 20px 0',
      },
    container: {
        marginBottom: '60px',
    },
    textHeading: {
        color: '#000',
        textAlign: 'left',
        marginTop: '20px',
        marginLeft: '20px'
      },
  }));

function Info() {
    const classes = useStyles()

    const userInfo = useSelector(state => state.userSlice.userInfo)

    return (
        <Grid container direction='row'>
            <Grid item xs={1} sm ={2} md={4} lg={4}></Grid>
            <Grid item container direction='column' xs={10} sm={8} md={4} lg={4} className={classes.container}>
                <Typography className={classes.textHeading} type='h2'>User Info: </Typography>
                <Typography className={classes.text} type='p'>Email: {userInfo.email}</Typography>
                <Typography className={classes.text} type='p'>Weight: {userInfo.weight} pounds</Typography>
                <Typography className={classes.text} type='p'>Activity Level: {userInfo.activity_level} calories burned per day</Typography>
                <Typography className={classes.text} type='p'>Desired Loss: {userInfo.desired_loss_rate} pounds per week</Typography>
            </Grid>
            <Grid item xs={1} sm ={2} md={4} lg={4}></Grid>
        </Grid>
        
    )
}

export default Info
