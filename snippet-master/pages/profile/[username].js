import React from 'react'
import Layout from '../../Components/Layout'
import MainContent from '../../Components/MainContent/MainContent'
import { useSnippetContext } from '../../context/snippetContext'
import Snippet from '../../Components/Snippet/Snippet'
import styled from 'styled-components'
import { useThemeContext } from '../../context/themeContext'
import Button from '../../Components/Button/Button'
import { down } from '../../utils/Icons'
import { userPublicProfile } from '../../actions/user'
import moment from 'moment'

function Profile({ user, snippets }) {
    const theme = useThemeContext()

    return (
        <Layout>
            <MainContent >
                <ProfileStyled theme={theme}>
                    <div className="profile-container">
                        <div className="profile-header">
                            <h5>
                                {user.name}
                            </h5>
                            <p>
                                Joined {moment(user.createdAt).fromNow()}
                            </p>
                        </div>
                    </div>
                    <div className="createdByUser">
                        <h5>Snippets created by {user.name}</h5>
                        <div className="user-snippets">
                            {snippets.map((snippet) => {
                                return <Snippet key={snippet._id} snippet={snippet} />
                            })}
                        </div>
                    </div>
                </ProfileStyled>
            </MainContent>
        </Layout>
    )
}

Profile.getInitialProps = async ({ query }) => {
    return userPublicProfile(query.username).then(data => {
        if(data.error) {
            console.log(data.error)
        } else {
            return { user: data.user, snippets: data.snippets }
        }
    })
}

const ProfileStyled = styled.div`
    padding: 2rem 1.5rem;
    
    .createdByUser{
        .user-snippets{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 2rem;
        }
    }
`;

export default Profile