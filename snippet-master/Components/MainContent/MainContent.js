import React from 'react'
import styled from 'styled-components'
import { useUserContext } from '../../context/context';
import { useThemeContext } from '../../context/themeContext';
function MainContent({children}) {
    const theme = useThemeContext()
    const {collapsed} = useUserContext()
    return (
        <MainContentStyled theme={theme} collapsed={collapsed}>
            {children}
        </MainContentStyled>
    )
}

const MainContentStyled = styled.main`
    flex: 1;
    margin-left: ${props => props.collapsed ? props.theme.sidebarWidth  : props.theme.sidebarCollapsed};
    background-color: ${props => props.theme.colorBg3};
    min-height: 100vh;
    margin-top: 8vh;
`;

export default MainContent