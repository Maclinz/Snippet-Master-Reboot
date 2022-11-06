import React, { useEffect, useState } from 'react'
import { getCookie } from '../../actions/auth'
import { listBookmarks } from '../../actions/snippet'
import { userPublicProfile } from '../../actions/user'
import Layout from '../../Components/Layout'
import MainContent from '../../Components/MainContent/MainContent'
import Snippet from '../../Components/Snippet/Snippet'

function Bookmarks({ user, snippets }) {
    
    const token = getCookie('token')
    const [bookmarks, setBookmarks] = useState([])


    useEffect( () => {
        listBookmarks(token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setBookmarks(data)
            }
        })
    }, [] )

    return (
        <Layout>
            <MainContent>
                <h1>
                    This page is still under construction
                </h1>
               
            </MainContent>
        </Layout>
    )
}


Bookmarks.getInitialProps = async ({ query }) => {
    return userPublicProfile(query.username).then(data => {
        if (data.error) {
            console.log(data.error)
        } else {
            return { user: data.user, snippets: data.snippets }
        }
    })

}



export default Bookmarks