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
import Private from '../../Components/auth/Private'
import Link from 'next/link'

function UserProfile() {
    const theme = useThemeContext()

    return (
        <Layout>
            <MainContent >
                <Private>
                <ProfileStyled theme={theme}>
                    <Link href="/profile/update">Update Profile</Link>
                </ProfileStyled>
                </Private>
            </MainContent>
        </Layout>
    )
}

const ProfileStyled = styled.div`
    padding: 2rem 1.5rem;
`;

export default UserProfile