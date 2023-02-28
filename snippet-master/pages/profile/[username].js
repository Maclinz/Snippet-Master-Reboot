import React from 'react'
import Layout from '../../Components/Layout'
import MainContent from '../../Components/MainContent/MainContent'
import { useSnippetContext } from '../../context/snippetContext'
import Snippet from '../../Components/Snippet/Snippet'
import styled from 'styled-components'
import { useThemeContext } from '../../context/themeContext'
import Button from '../../Components/Button/Button'
import { down, githubIcon, linked, mailIcon } from '../../utils/Icons'
import { userPublicProfile } from '../../actions/user'
import moment from 'moment'
import Link from 'next/link'
import  Router from 'next/router'
import { singleSnippet } from '../../actions/snippet'
import { useEffect } from 'react'

function Profile({ user, snippets, snippet }) {
    const theme = useThemeContext()
    const {loading} = useSnippetContext()


    return (
        <Layout>
            <MainContent >
                <ProfileStyled theme={theme}>
                    <div className="profile-container">
                        <div className="profile-content">
                            <div className="profile-header">
                                <div className="image-con"></div>
                                <h5>
                                    {user.name}
                                </h5>
                                <p>
                                    Joined {moment(user.createdAt).fromNow()}
                                </p>
                            </div>
                            <div className="profile-body">
                                <div className="left-profile">
                                    <h5>
                                        {user.name}
                                    </h5>
                                    <p>
                                        {!user.about ? 'No bio, There is nothing to see here.' : user.about}
                                    </p>
                                </div>
                                <div className="right-profile">
                                    <div className="socials">
                                        <div className="social" onClick={() => Router.push(`${!user.github ? '/' : user.github}`)}>
                                            <span>
                                                {githubIcon}
                                            </span>
                                            <Link href={!user.github ? '/' : user.github}>GitHub</Link>
                                        </div>
                                        <div className="social" onClick={() => Router.push(`${!user.linkedin ? '/' : user.linkedin}`)}>
                                            <span>
                                                {linked}
                                            </span>
                                            <Link href={!user.linkedin ? '/' : user.linkedin}>LinkedIn</Link>
                                        </div>
                                        <div className="social" onClick={() => Router.push(`${!user.mail ? '/' : user.linkedin}`)}>
                                            <span>
                                                {mailIcon}
                                            </span>
                                            <Link href={!user.mail ? '/' : user.linkedin}>Email</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="createdByUser">
                        <h5>Snippets created by <span>{user.name}</span></h5>
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
    padding: 1.5rem;
    .profile-content{
        width: 100%;
        margin: 0 auto;
    }
    .profile-container{
        height: 40vh;
        background: ${props => props.theme.colorBg2};
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2rem;
        .profile-header{
            display: flex;
            flex-direction: column;
            align-items: center;
            h5{
                font-size: 2rem;
                color: ${props => props.theme.colorPrimaryGreen};
            }
        }
    }
    .createdByUser{
        h5{
            font-size: 2rem;
            text-align: center;
            margin-bottom: 2rem;
            span{
                color: ${props => props.theme.colorPrimaryGreen};
            }
        }
        .user-snippets{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 2rem;
            @media screen and (max-width: 1260px){
                grid-template-columns: repeat(1, 1fr);
            }
        }
    }

    .profile-body{
        width: 80%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        margin-top: 2.5rem;
        .left-profile{
            width: 50%;
            h5{
                font-size: 1.4rem;
                margin-bottom: .5rem;
            }
        }
        .socials{
            background-color: ${props => props.theme.colorBg};
            padding: 1rem 4rem;
            display: flex;
            flex-direction: column;
            border-radius: ${props => props.theme.borderRadiusSm};
            .social{
                display: grid;
                grid-template-columns: 35px 1fr;
                padding-right: 5rem;
                cursor: pointer;
                i{
                    font-size: 1.5rem;
                }
                justify-content: space-evenly;
                margin: .8rem 0;
            }
        }
    }
`;

export default Profile