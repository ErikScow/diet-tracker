import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import { axiosWithAuth, checkToken } from '../../api/backendCalls'

function PrivateRoute({component: Component, ...rest}) {
    const userId = useSelector((state) => state.slice.id)

    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(()=> {
        checkToken(userId)
            .then(res => {
                setAuthenticated(true)
                setLoading(false)
            })
            .catch(err => {
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