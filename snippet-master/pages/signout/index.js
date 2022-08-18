import Router from 'next/router'
import React, { useEffect } from 'react'
function index() {
    useEffect(() => {
        //redirect to login page as soon as the component is mounted
        Router.push('/')
    },[])
    return (
        <div></div>
    )
}

export default index