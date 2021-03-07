import React from 'react';

import { Grid, Typography, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ClearIcon from '@material-ui/icons/Clear'
import { useDispatch, useSelector } from 'react-redux';

import { deleteCalorieEventCall } from '../../state/eventsSlice';
import { updateDayCall } from '../../state/dailySlice';

const useStyles = makeStyles((theme) => ({
    red: {
        color: 'red',
    },
    button: {
        padding: '0',

    },
    redText: {
        color: 'red',
        paddingLeft: '5px'
    }

}))

function Event(props) {
    const classes = useStyles()

    const dispatch = useDispatch()

    const userId = useSelector(state => state.userSlice.userInfo.id)
    const date = useSelector(state => state.dailySlice.formattedDate)
    const calorieTotal = useSelector(state => state.dailySlice.dailyInfo.calorie_total)

    const deleteEvent = () => {

        let newCalorieTotal

        if (props.positive){
            newCalorieTotal = Number(calorieTotal) - Number(props.magnitude)
        } else {
            newCalorieTotal = Number(calorieTotal) + Number(props.magnitude)
        }
        const newDateInfo = {
            calorie_total: newCalorieTotal
        }

        dispatch(updateDayCall(userId, date, newDateInfo))
        dispatch(deleteCalorieEventCall(userId, date, props.id))
        
    }

    return (
        <div>
            
                
                <Grid item container direction='row' >
                    <Grid item xs={4}>
                       {props.positive ? <Typography type='p' className={classes.redText}>+ {props.magnitude} Cal</Typography> 
                        : <Typography type='p' className={classes.redText}>- {props.magnitude} Cal</Typography>} 
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={2}>
                        <Typography type='p' className={classes.redText}>{props.note}</Typography>
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={1}>
                       <IconButton onClick={deleteEvent} className={classes.button}><ClearIcon className={classes.red}/></IconButton> 
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            
            
        </div>
    );
}

export default Event;