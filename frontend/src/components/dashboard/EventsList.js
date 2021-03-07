import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getCalorieEventsCall } from '../../state/eventsSlice';
import { formattedDate } from '../../utils/dateFormatting';

import Event from './Event'

function EventsList(props) {

    const dispatch = useDispatch()

    const userId = useSelector(state => state.userSlice.userInfo.id)
    const allEvents = useSelector(state => state.eventsSlice.calorieEvents)

    useEffect(() => {
        const date = formattedDate()
        dispatch(getCalorieEventsCall(userId, date))
    },[])
    return (
        
        <div>
            {allEvents.map(eventObject => {
                return <Event 
                    key={eventObject.id}
                    id={eventObject.id}
                    note={eventObject.note}
                    magnitude={eventObject.magnitude}
                    positive={eventObject.positive}
                />
            })}
        </div>
        
    );
}

export default EventsList;