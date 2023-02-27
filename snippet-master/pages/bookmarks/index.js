import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getCookie, isAuth } from '../../actions/auth'
import { listAllSnippets, singleSnippetById } from '../../actions/snippet'
import { userPublicProfile, getProfile } from '../../actions/user'
import Layout from '../../Components/Layout'
import MainContent from '../../Components/MainContent/MainContent'
import Snippet from '../../Components/Snippet/Snippet'
import { useSnippetContext } from '../../context/snippetContext'
import { useThemeContext } from '../../context/themeContext'

function Bookmarks() {

    const theme = useThemeContext()

    const [userProfile, setUserProfile] = useState({})
    const [snippets, setSnippets] = useState([])


    useEffect(() => {
        const token = getCookie('token')

        getProfile(token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setUserProfile(data)
                listAllSnippets().then(data => {
                    if(data.error) {
                        console.log(data.error)
                    } else {
                        setSnippets(data)
                    }
                })
            }
        })


    }, [])

    console.log('snipped', userProfile.bookmarks)

    return (
        <Layout>
            <MainContent>
            <BookmarksStyled theme={theme}>
                <div className="snippets-con">
                    {userProfile.bookmarks && userProfile.bookmarks.map((id) => {
                        console.log('mapping', id)
                        const snippet = snippets.find(s => s._id === id);
                        console.log('snippet', snippet)
                        
                        return !snippet ? null : <Snippet key={snippet._id} snippet={snippet} />
                    })
                    }
                </div>
            </BookmarksStyled>
            </MainContent>
    </Layout>
    )
}

const BookmarksStyled = styled.div`
    .snippets-con{
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        padding: 6.1rem 1.5rem;
        grid-gap: ${props => props.theme.gridGap};
        transition: all .2s ease-in-out;
        @media screen and (max-width: 1260px){
            grid-template-columns: repeat(1, 1fr);
        }
    }
`;





export default Bookmarks