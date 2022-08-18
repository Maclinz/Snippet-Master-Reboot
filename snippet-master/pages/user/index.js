import React from 'react'
import Private from '../../Components/auth/Private';
import Layout from '../../Components/Layout'
import MainContent from '../../Components/MainContent/MainContent';

function index() {
    return ( 
    <Private>
        <Layout>
            <MainContent>
                <h1>User Dash</h1>
            </MainContent>
        </Layout>
    </Private>
    )
}

export default index;