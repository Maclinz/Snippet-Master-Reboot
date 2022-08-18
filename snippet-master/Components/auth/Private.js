import React, { useEffect } from 'react'
import Router from 'next/router'
import { isAuth } from '../../actions/auth'


function Private({children}) {
    //if user is not authenticated, redirect to home page
    useEffect(() => {
        if(!isAuth()) {
            Router.push('/')
        }
    },[])

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default Private