import React from 'react'
import styled from 'styled-components'
import { useUserContext } from '../../context/context';
import { useThemeContext } from '../../context/themeContext';
import Tags from '../Tags/Tags'

function ModalFull() {
    const theme = useThemeContext()
    const {hideModal} = useUserContext()
    return (
        <ModalFullStyled theme={theme} onClick={hideModal}>
            <div className="modal-content">
                <form action="">
                    <div className="input-control">
                        <input type="text" id="title" placeholder='Title...' />
                    </div>
                    <div className="input-control">
                        <div className="code-body">
                            <pre>
                                <code>
                                    <textarea name="" id="" cols="30" rows="10" placeholder='Add Your Code Here...'></textarea>
                                </code>
                            </pre>
                        </div>
                    </div>
                </form>
                <Tags />
            </div>
        </ModalFullStyled>
    )
}
const ModalFullStyled = styled.div`
    width: 100%;
    height: 100vh;
    z-index: 10;
    position: fixed;
    background-color: ${props => props.theme.colorIcons4};
    top: 0;
    backdrop-filter: blur(3px);
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
`;

export default ModalFull