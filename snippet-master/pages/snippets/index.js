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

    return (
        <Layout>
            <MainContent >
                <AllSnippetsStyed theme={theme}>
                    {
                        snippets.map(snippet => {
                            return <Snippet key={snippet._id} snippet={snippet} />
                        })
                    }
                </AllSnippetsStyed>
            </MainContent>
        </Layout>
    )
}

const AllSnippetsStyed = styled.div`
    padding: 6rem 1.5rem;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 2rem;
`;

export default Snippets