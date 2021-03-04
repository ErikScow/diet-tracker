import React, { useEffect } from 'react';

import { formattedDate } from '../../utils/dateFormatting'
import { getToday, createDay } from '../../api/backendCalls'

import Nav from '../common/Nav'
import CalorieMeter from './CalorieMeter'
import EventsList from './EventsList'

function Dashboard(props) {

    useEffect(() => {
        formattedDate()
        /*getToday()
            .then()
            .catch()*/
    },[])

    return (
        <div>
            <Nav />
            <CalorieMeter />
            <EventsList />
        </div>
    );
}

export default Dashboard;