import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import { getCalorieEventsCall } from '../../state/eventsSlice';
import { formattedDate } from '../../utils/dateFormatting';

import Event from './Event'

const useStyles = makeStyles((theme) => ({
    sectionLabel: {
        color: '#757575',
        textAlign: 'left',
        margin: '25px 20px 20px',
    },

  }));

function EventsList(props) {
    const classes = useStyles()

    const dispatch = useDispatch()

    const userId = useSelector(state => state.userSlice.userInfo.id)
    const allEvents = useSelector(state => state.eventsSlice.calorieEvents)

    useEffect(() => {
        const date = formattedDate()
        dispatch(getCalorieEventsCall(userId, date))
    },[])
    return (
        
            <Grid container direction='row'>
                <Grid item xs={1} sm ={2} ></Grid>
                    <Grid item container direction='column' xs={10} sm={8} md={12} lg={12}>
                        <Typography type='h3' className={classes.sectionLabel}>Calorie Events</Typography>
                        {allEvents.map(eventObject => {
                            return <Event 
                                key={eventObject.id}
                                id={eventObject.id}
                                note={eventObject.note}
                                magnitude={eventObject.magnitude}
                                positive={eventObject.positive}
                            />
                        })}
                    </Grid>
                <Grid item xs={1} sm ={2}></Grid>
            </Grid>
        
    );
}

export default EventsList;