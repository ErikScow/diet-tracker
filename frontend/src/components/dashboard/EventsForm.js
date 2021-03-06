import React from 'react';

import AddCaloriesForm from './AddCaloriesForm'
import SubtractCaloriesForm from './SubtractCaloriesForm'

function EventsForm(props) {
    return (
        <div>
            <AddCaloriesForm />
            <SubtractCaloriesForm />
        </div>
    );
}

export default EventsForm;