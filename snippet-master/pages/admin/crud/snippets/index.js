import React from 'react'
import Layout from '../../../../Components/Layout'
import MainContent from '../../../../Components/MainContent/MainContent'
import styled from 'styled-components'
import { useSnippetContext } from '../../../../context/snippetContext'
import SnippetAdmin from '../../../../Components/AdminSnippet/SnippetAdmin'
import Loading from '../../../../Components/Loading/Loading'
import ConfirmModal from '../../../../Components/ConfirmModal/ConfirmModal'

function index() {
    const { allSnippetsAdmin, loading, snippetModal } = useSnippetContext()
    return (
        <Layout>
            <MainContent>
                <SnippetAdminStyled>
                    {
                        snippetModal && <ConfirmModal />
                    }
                    <div className="loading-con">
                        {
                            loading && <Loading />
                        }
                    </div>
                    <div className="all-snippets">
                        {!loading &&
                            allSnippetsAdmin.map((snippet) => {
                                return <SnippetAdmin key={snippet._id} snippet={snippet} />
                            })
                        }
                    </div>
                </SnippetAdminStyled>
            </MainContent>
        </Layout>
    )
}

const SnippetAdminStyled = styled.div`
    .all-snippets{
        padding: 2rem 1.5rem;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-gap: 2rem;
    }
`;

export default index