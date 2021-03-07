import React from 'react';

import { Grid, Typography, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ClearIcon from '@material-ui/icons/Clear'
import { useDispatch, useSelector } from 'react-redux';

import { deleteCalorieEventCall } from '../../state/eventsSlice';
import { updateDayCall } from '../../state/dailySlice';

const useStyles = makeStyles((theme) => ({
    text: {
        color: 'red'
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
            <Grid container direction='row'>
                <Typography type='p' className={classes.text}>{props.magnitude}</Typography>
                <Typography type='p' className={classes.text}>{props.note}</Typography>
                <IconButton onClick={deleteEvent}><ClearIcon className={classes.text}/></IconButton>
            </Grid>
            
        </div>
    );
}

export default Event;