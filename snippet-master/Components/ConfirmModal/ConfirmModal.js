import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useState, useTransition } from 'react'
import styled from 'styled-components'
import { useUserContext } from '../../context/context';
import { useThemeContext } from '../../context/themeContext';
import { add } from '../../utils/Icons';
import { withRouter } from 'next/router'
import Button from '../Button/Button';
import { useSnippetContext } from '../../context/snippetContext';



function ConfirmModal() {
    const theme = useThemeContext()
    const { hideSnippetModal, deleteSnippet, allSnippetsAdmin, listAllSnippetsAdmin } = useSnippetContext()

    //const slugger = allSnippetsAdmin.map(snippet => snippet.slug)

    //console.log(slug);

    const handleDelete = (e) => {
        //get index of clicked snippet
        
        console.log('index',index);
    }
    

    return (
        <ModalFullStyled theme={theme} className={'snippet-form'}>
            <div className="modal-content">
                <Button
                    name={'Delete'}
                    type={'submit'}
                    selector={'btn-login'}
                    padding={'.8rem 2rem'}
                    borderRad={'0.8rem'}
                    fw={'bold'}
                    fs={'1.2rem'}
                    backgound={theme.colorPrimary2}
                    click={handleDelete}
                />
                <Button
                    name={'Cancel'}
                    type={'submit'}
                    selector={'btn-login'}
                    padding={'.8rem 2rem'}
                    borderRad={'0.8rem'}
                    fw={'bold'}
                    fs={'1.2rem'}
                    backgound={theme.colorPrimary2}
                    click={hideSnippetModal}
                />
            </div>
            <div className="modal-hider" onClick={hideSnippetModal}>
            </div>
        </ModalFullStyled>
    )
}
const ModalFullStyled = styled.div`
    width: 100%;
    height: 100vh;
    z-index: 10;
    position: fixed;
    top: 0;
    .modal-hider{
        width: 100%;
        height: 100%;
        background-color: ${props => props.theme.colorIcons4};
        position: absolute;
        top: 0;
        backdrop-filter: blur(3px);
    }
    .modal-content{
        position: absolute;
        width: 60%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${props => props.theme.colorBg2};
        padding: 2rem;
        border-radius: ${props => props.theme.borderRadiusSm};
        box-shadow: ${props => props.theme.shadow3};
        z-index: 15;
        .input-control{
            margin: 1.5rem 0;
            input, textarea{
                width: 100%;
                border: 1px solid ${props => props.theme.colorIcons};
                border-radius: ${props => props.theme.borderRadiusSm};
                padding: .7rem 1.2rem;
                color: ${props => props.theme.colorGrey0};
                resize: none;
            }
        }
    }

    .create-snippet{
        display: flex;
        justify-content: flex-end;
    }

`;

export default ConfirmModal