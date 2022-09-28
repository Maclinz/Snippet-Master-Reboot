import React from 'react'
import Layout from '../../../../Components/Layout'
import MainContent from '../../../../Components/MainContent/MainContent'
import styled from 'styled-components'
import { useSnippetContext } from '../../../../context/snippetContext'
import SnippetAdmin from '../../../../Components/AdminSnippet/SnippetAdmin'
import Loading from '../../../../Components/Loading/Loading'
import ConfirmModal from '../../../../Components/ConfirmModal/ConfirmModal'
import Tags from '../../../../Components/Tags/Tags'
import Admin from '../../../../Components/auth/Admin'

function index() {
    const { allSnippetsAdmin, loading, snippetModal } = useSnippetContext()
    return (
        <Layout>
            <MainContent>
                <Admin>
                    <SnippetAdminStyled>
                        {
                            snippetModal && <ConfirmModal />
                        }
                        <div className="loading-con">
                            {
                                loading && <Loading />
                            }
                        </div>
                        <div className="create-tags">
                            <Tags />
                        </div>
                        <div className="all-snippets">
                            {!loading &&
                                allSnippetsAdmin.map((snippet) => {
                                    return <SnippetAdmin key={snippet._id} snippet={snippet} />
                                })
                            }
                        </div>
                    </SnippetAdminStyled>
                </Admin>
            </MainContent>
        </Layout>
    )
}

const SnippetAdminStyled = styled.div`
    .all-snippets{
        padding: 2rem 1.5rem;
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        grid-gap: 2rem;
    }

    .create-tags{
        padding: 2rem 1.5rem;
        display: flex;
        justify-content: center;
        width: 80%;
        margin: 0 auto;
        position: relative;
        z-index: 1;
        form{
            justify-content: center;
            .form-group{
                width: initial;
            }
        }
    }
`;

export default index