import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Divider, Grid } from '@material-ui/core';
import { formattedDate } from '../../utils/dateFormatting'
import { calculateBmr, calculateSuggestion } from '../../utils/calorieCalculations'

import Nav from '../common/Nav'
import CalorieMeter from './CalorieMeter'
import EventsForm from './EventsForm'
import EventsList from './EventsList'
import { getTodayCall, updateDayCall, updateFormattedDate } from '../../state/dailySlice';
import { getCalorieEventsCall } from '../../state/eventsSlice'
import { updateUserCall } from '../../state/userSlice';
import AddCaloriesForm from './AddCaloriesForm';
import SubtractCaloriesForm from './SubtractCaloriesForm'

function Dashboard(props) {
    const dispatch = useDispatch()

    const userId = useSelector(state => state.userSlice.userInfo.id)
    const userInfo = useSelector(state => state.userSlice.userInfo)
    const dailyData = useSelector(state => state.dailySlice.dailyInfo)
    const currentDate = useSelector(state => state.dailySlice.formattedDate)

    const date = formattedDate()

    useEffect(() => {
        
        const defaultDay = createDayObject(date)
        dispatch(updateFormattedDate(date))
        //the default day object is passed to redux to be used in case no day has yet been created
        dispatch(getTodayCall(userId, date, defaultDay))
    },[])

    const createDayObject = (date) => {
        const bmr = calculateBmr(userInfo.gender, userInfo.weight, userInfo.height, userInfo.age)
        const calorieSuggestion = calculateSuggestion(bmr, userInfo.activity_level, userInfo.desired_loss_rate)
        return {
            date: date,
            user_id: userId,
            calorie_total: 0,
            bmr: bmr,
            calorie_suggestion: calorieSuggestion,
            weight: userInfo.weight
        }
    }

    return (
        <div>
            <Nav />
            <Grid container>
                <CalorieMeter />
                <Grid container direction='row' xs={12} md={6}>
                    <Grid item container direction='column' xs={10} sm={8} md={4} lg={4}></Grid>
                        <AddCaloriesForm />
                        <SubtractCaloriesForm />
                        <EventsList />
                </Grid>
                
            </Grid>
                    
                
            
        </div>
    );
}

export default Dashboard;