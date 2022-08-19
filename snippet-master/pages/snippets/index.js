import React from 'react'
import Layout from '../../Components/Layout'
import MainContent from '../../Components/MainContent/MainContent'
import { useSnippetContext } from '../../context/snippetContext'
import Snippet from '../../Components/Snippet/Snippet'
import styled from 'styled-components'
import { useThemeContext } from '../../context/themeContext'

function Snippets() {
    const {snippets, loading} = useSnippetContext()
    const theme = useThemeContext()

    //handle if data is not yet available
    if(loading) {
        return <div>Loading...</div>
    }

    console.log('loading', loading);

    return (
        <Layout>
            <MainContent>
                <SnippetsStyed theme={theme}>
                    {
                        snippets.map(snippet => {
                            return <Snippet key={snippet._id} snippet={snippet} />
                        })
                    }
                </SnippetsStyed>
            </MainContent>
        </Layout>
    )
}

const SnippetsStyed = styled.div`
    padding: 6rem 1.5rem;
    grid-gap: ${props => props.theme.gridGap};
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

export default Snippets