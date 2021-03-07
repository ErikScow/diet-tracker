import React from 'react';

import { useDispatch, useSelector } from 'react-redux'

import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Divider, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    calorieIndicator: {
        color: '#747474'
    },
    divide: {
        background: '#757575',
        borderRadius: '2px',
        borderStyle: 'none',
        height: '3px'
    }
}))

function CalorieMeter(props) {
    const classes = useStyles()

    const dispatch = useDispatch()

    const calorieTotal = useSelector(state => state.dailySlice.dailyInfo.calorie_total)
    const calorieSuggestion = useSelector(state => state.dailySlice.dailyInfo.calorie_suggestion)

    return (
        <Grid container direction='row'>
            <Grid item item xs={1} sm ={2} md={4} lg={4}></Grid>
            <Grid item container xs={10} sm={8} md={4} lg={4}>
                <CircularProgressbarWithChildren value={calorieTotal} maxValue={calorieSuggestion}>
                    <Grid>
                        <Typography variant='h3' className={classes.calorieIndicator}>{calorieTotal}</Typography>
                        <hr className={classes.divide}/>
                        <Typography variant='h3' className={classes.calorieIndicator}>{calorieSuggestion}</Typography>
                    </Grid>
                    
                </CircularProgressbarWithChildren>
            </Grid>
            <Grid item item xs={1} sm ={2} md={4} lg={4}></Grid>
            
        </Grid>
    );
}

export default CalorieMeter;