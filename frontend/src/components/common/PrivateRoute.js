import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'

import { checkTokenCall } from '../../state/authSlice'

function PrivateRoute({component: Component, ...rest}) {
    const dispatch = useDispatch()

    const userId = useSelector((state) => state.authSlice.userInfo.id)
    const authenticated = useSelector(state => state.authSlice.authenticated)
    const authCheckLoading = useSelector(state => state.authSlice.authCheckLoading)

    useEffect(()=> {
        dispatch(checkTokenCall(userId, () => {
            localStorage.removeItem('token')
        }))
    },[userId])

    if (authCheckLoading){
        return <CircularProgress />
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