import React from 'react';

import { useDispatch, useSelector } from 'react-redux'

import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
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
    },
    container: {
        padding: '30px',
        width: '100%'
    }
}))

function CalorieMeter(props) {
    const classes = useStyles()

    const dispatch = useDispatch()

    const calorieTotal = useSelector(state => state.dailySlice.dailyInfo.calorie_total)
    const calorieSuggestion = useSelector(state => state.dailySlice.dailyInfo.calorie_suggestion)

    return (
        <Grid container direction='row' item xs={12} sm={12} md={6}>
            <Grid item item xs={1} sm ={3} md={1} lg={1} xl={2}></Grid>
            <Grid item container xs={10} sm={6} md={10} lg={10} xl={8}>
                <div className={classes.container}>
                    <CircularProgressbarWithChildren value={calorieTotal} maxValue={calorieSuggestion} strokeWidth={5}
                    styles={buildStyles({
                        strokeLinecap: "butt"
                    })}>
                    <div>
                            <Typography variant='h3' className={classes.calorieIndicator}>{calorieTotal}</Typography>
                            <hr className={classes.divide}/>
                            <Typography variant='h3' className={classes.calorieIndicator}>{calorieSuggestion}</Typography>
                        </div>
                        
                    </CircularProgressbarWithChildren>
                </div>
                
            </Grid>
            <Grid item item xs={1} sm ={3} md={1} lg={1} xl={2}></Grid>
            
        </Grid>
    );
}

export default CalorieMeter;