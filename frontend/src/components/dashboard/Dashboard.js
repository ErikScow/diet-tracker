import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { formattedDate } from '../../utils/dateFormatting'
import { getToday, createDay } from '../../api/backendCalls'

import Nav from '../common/Nav'
import CalorieMeter from './CalorieMeter'
import EventsList from './EventsList'
import { getTodayCall } from '../../state/dailySlice';

function Dashboard(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        const date = formattedDate()
        dispatch(updateFormattedDate(date))
        dispatch(getTodayCall(userId, formattedDate))
    },[])

    const dayObject = () => {

    }

    const updateDay = () => {

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