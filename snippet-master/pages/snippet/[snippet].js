import React from 'react'
import Layout from '../../Components/Layout'
import MainContent from '../../Components/MainContent/MainContent'
import { useThemeContext } from '../../context/themeContext'
import Snippet from '../../Components/Snippet/Snippet'
import styled from 'styled-components'
import { singleSnippet } from '../../actions/snippet'

function SingleSnippet({ snippet }) {
    const theme = useThemeContext()

    if (!snippet) {
        return <div>Snippet not found</div>
    }

    return (
        <Layout>
            <MainContent>
                <SingleSnippetStyled theme={theme}>
                    <Snippet snippet={snippet} />
                </SingleSnippetStyled>
            </MainContent>
        </Layout>
    )
}

const SingleSnippetStyled = styled.div`
    padding: 1.5rem;
`

export async function getServerSideProps({ params }) {
    const snippet = await singleSnippet(params.snippet)
    return {
        props: {
            snippet,
        },
    }
}

export default SingleSnippet
