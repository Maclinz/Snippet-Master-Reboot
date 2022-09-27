import React from 'react'
import Private from '../../Components/auth/Private'
import Layout from '../../Components/Layout'
import MainContent from '../../Components/MainContent/MainContent'

function index() {
    return (
        <Layout>
            <MainContent>
                <Private>
                    <h1>Settings</h1>
                </Private>
            </MainContent>
        </Layout>
    )
}

export default index