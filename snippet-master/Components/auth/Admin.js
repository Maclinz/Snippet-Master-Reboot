import React, { useEffect } from 'react'
import Router from 'next/router'
import { isAuth } from '../../actions/auth'


function Admin({ children }) {
    //if user is not authenticated, redirect to home page
    useEffect(() => {
        if (!isAuth()) {
            Router.push('/')
        }else if(isAuth() && isAuth().role !== 1) {
            Router.push('/')
        }

    }, [])


    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default Admin