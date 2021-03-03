import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import { axiosWithAuth, checkToken } from '../../api/backendCalls'
import { authenticate, deAuthenticate } from '../../state/slice'

function PrivateRoute({component: Component, ...rest}) {
    const dispatch = useDispatch()

    const userId = useSelector((state) => state.slice.id)

    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(()=> {
        checkToken(userId)
            .then(res => {
                dispatch(authenticate())
                setAuthenticated(true)
                setLoading(false)
            })
            .catch(err => {
                dispatch(deAuthenticate())
                setAuthenticated(false)
                localStorage.removeItem('token')
                setLoading(false)
            })
    },[userId])

    if (loading){
        return <div>loading</div>
    }

    return <Route 
            {...rest}
            render={props => {
                if (!authenticated){
                    return <Redirect to='/login' />
                } else {
                    return <Component {...props} />
                }
            }}
        />

}

export default PrivateRoute;