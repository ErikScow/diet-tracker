import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({component: Component, ...rest}) {
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(()=> {
        const token = localStorage.getItem('token')
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