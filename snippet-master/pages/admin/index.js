import React from 'react'
import Admin from '../../Components/auth/Admin';
import CreateCategories from '../../Components/CreateCategories/CreateCategories';
import Layout from '../../Components/Layout'
import MainContent from '../../Components/MainContent/MainContent';

function index() {
    return (
        <Admin>
            <Layout>
                <MainContent>
                    
                </MainContent>
            </Layout>
        </Admin>
    )
}

export default index;