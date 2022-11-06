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
import Router, { withRouter } from 'next/router'
import { singleSnippet } from '../../actions/snippet'

function SingleSnippet({snippet}) {
    const theme = useThemeContext()

    return (
        <Layout>
            <MainContent >
                <SingleSnippetStyled theme={theme}>
                    <Snippet snippet={snippet} />
                </SingleSnippetStyled>
            </MainContent>
        </Layout>
    )
}

//get initial props : must be in the actuall snippet page, I will create a neww page for this
SingleSnippet.getInitialProps = async ({query}) => {
    //get snippet slug
    //console.log('Quedzzadddddddddds',query.snippet );
    
    return singleSnippet(query.snippet).then(data => {
        if(data.error) {
            console.log(data.error)
        } else {
            return {snippet: data}
        }
    })
}



const SingleSnippetStyled = styled.div`
    padding: 1.5rem;
`;

export default SingleSnippet