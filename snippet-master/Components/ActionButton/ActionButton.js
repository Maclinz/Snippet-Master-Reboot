import React from 'react'
import styled from 'styled-components';
import { useThemeContext } from '../../context/themeContext';

function ActionButton({icon,background,click, blob}) {

    const theme = useThemeContext()

    return (
        <ActionButtonStyled 
            theme={theme}  
            onClick={click}
            style={{
                background: background,
            }}>
            {icon}
            <span className={blob}></span>
        </ActionButtonStyled>
    )
}

const ActionButtonStyled = styled.button`
    display: flex;
    align-items: center;
    position: relative;
    color: ${props => props.theme.colorWhite};
    z-index: 5;
    cursor: pointer;
    overflow: hidden;
    padding: 0.8rem 1rem;
    border-radius: ${props => props.theme.borderRadiusSm};
    i{
        color: ${props => props.theme.colorWhite};
        font-size: 1.5rem;
        transition: all .2s ease-in-out;
    }
    .blob{
        position: absolute;
        top: 30px;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        right: -60px;
        z-index: -1;
        background-color: ${props => props.theme.colorIcons};
        transition: all 0.4s ease-in-out;
        opacity: 0.7;
    }
    &:hover{
        transition: all .3s ease-in-out;
        .blob{
            transform: scale(1.7);
        }
        i{
            color: ${props => props.theme.colorPrimaryGreen};
            transition: all .2s ease-in-out;
        }
    }
`;

export default ActionButton;