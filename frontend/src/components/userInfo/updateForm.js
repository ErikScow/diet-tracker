import React from 'react';

import WeightForm from './WeightForm'
import ActivityForm from './ActivityForm'
import DesiredLossForm from './DesiredLossForm'

function updateForm(props) {
    return (
        <div>
            <WeightForm />
            <ActivityForm />
            <DesiredLossForm />
        </div>
    );
}

export default updateForm;