import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { formattedDate } from '../../utils/dateFormatting'
import { calculateBmr, calculateSuggestion } from '../../utils/calorieCalculations'

import Nav from '../common/Nav'
import CalorieMeter from './CalorieMeter'
import EventsList from './EventsList'
import { getTodayCall, updateFormattedDate } from '../../state/dailySlice';

function Dashboard(props) {
    const dispatch = useDispatch()

    const userId = useSelector(state => state.userSlice.userInfo.id)
    const userInfo = useSelector(state => state.userSlice.userInfo)
    const dailyData = useSelector(state => state.dailySlice.dailyInfo)

    useEffect(() => {
        const date = formattedDate()
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

    const addEvent = () => {
    }

    return (
        <div>
            <Nav />
            <CalorieMeter />
            <EventsList />
        </div>
    );
}

export default Dashboard;