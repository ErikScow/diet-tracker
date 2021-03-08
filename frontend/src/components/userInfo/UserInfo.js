import React from 'react';

import Nav from '../common/Nav'
import UpdateForm from './updateForm'
import Info from './Info'

function UserInfo(props) {
    return (
        <div>
            <Nav />
            <Info />
            <UpdateForm />
        </div>
    );
}

export default UserInfo;