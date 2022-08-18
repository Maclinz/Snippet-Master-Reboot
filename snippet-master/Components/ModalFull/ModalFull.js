import React from 'react'
import styled from 'styled-components'
import { useUserContext } from '../../context/context';
import { useThemeContext } from '../../context/themeContext';
import { add } from '../../utils/Icons';
import Button from '../Button/Button';
import Tags from '../Tags/Tags'

function ModalFull() {
    const theme = useThemeContext()
    const {hideModal} = useUserContext()
    return (
        <ModalFullStyled theme={theme}>
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
                <div className="create-snippet">
                    <Button
                        name={'Create Snippet'}
                        type={'submit'}
                        selector={'btn-login'}
                        padding={'.9rem 1.2rem'}
                        borderRad={'0.5rem'}
                        fs={'1.2rem'}
                        backgound={theme.colorButton}
                        icon={add}
                        blob={'blob'}
                    />
                </div>
            </div>
            <div className="modal-hider" onClick={hideModal}>
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

export default ModalFull