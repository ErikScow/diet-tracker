import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import { axiosWithAuth, checkToken } from '../../api/backendCalls'

function PrivateRoute({component: Component, ...rest}) {
    const userId = useSelector((state) => state.slice.id)
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(()=> {
        console.log(userId)
        checkToken(userId)
            .then(res => {
                setAuthenticated(true)
            })
            .catch(err => {
                setAuthenticated(false)
            })
    },[])

    return (
        <Route 
            {...rest}
            render={props => {
                authenticated ?
                <Component {...props} />
                : <Redirect to='/login' />
            }}
        />
    );
}

export default PrivateRoute;