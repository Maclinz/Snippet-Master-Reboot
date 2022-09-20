import React from 'react'
import Layout from '../../Components/Layout'
import MainContent from '../../Components/MainContent/MainContent'
import { useSnippetContext } from '../../context/snippetContext'
import Snippet from '../../Components/Snippet/Snippet'
import styled from 'styled-components'
import { useThemeContext } from '../../context/themeContext'
import Button from '../../Components/Button/Button'
import { down } from '../../utils/Icons'
import Loading from '../../Components/Loading/Loading'
import { isAuth } from '../../actions/auth'

function Snippets() {
    const {snippets, loading,searchState, loadMore} = useSnippetContext()
    const theme = useThemeContext()

    const {searched, message} = searchState

    //filter out the snippets that are not created by the user
    const userSnippets = snippets.filter(snippet => snippet.postedBy._id === isAuth()._id)

    console.log('userSnippets Creat', userSnippets);

    return (
        <Layout>
            <MainContent >
                <div className="main-title">
                    <h1>Filters Goes Here...</h1>
                </div>
                <div className="loading-con">
                    {
                        loading && <Loading />
                    }
                </div>
                {!loading && <AllSnippetsStyed theme={theme}>
                    {
                        userSnippets.map(snippet => {
                            return <Snippet key={snippet._id} snippet={snippet} />
                        })
                    }
                </AllSnippetsStyed>}
                {loading || userSnippets.length > 5 && <div className="load-more">
                    <Button
                        name={'Load More'}
                        type={'submit'}
                        selector={'btn-login'}
                        padding={'.8rem 2rem'}
                        borderRad={'0.8rem'}
                        fw={'bold'}
                        fs={'1.2rem'}
                        backgound={theme.colorPrimary2}
                        icon={down}
                        blob={'blob'}
                        click={loadMore}
                    />
                </div>}
            </MainContent>
        </Layout>
    )
}

const AllSnippetsStyed = styled.div`
    padding: 1.5rem;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 2rem;
`;

export default Snippets