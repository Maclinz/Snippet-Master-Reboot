import React from 'react'
import styled from 'styled-components';
import LoginForm from '../../Components/LoginForm/LoginForm';
import SignUpForm from '../../Components/SignUpForm/SignUpForm';

function index() {
    return (
        <StyledLogin>
            <SignUpForm />
        </StyledLogin>
    )
}

const StyledLogin = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: ${props => props.theme.colorBg4};
`;

export default index;