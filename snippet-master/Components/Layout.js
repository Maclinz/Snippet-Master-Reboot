import React from "react"
import { useUserContext } from "../context/context"
import Header from "./Header/Header"
import Main from "./Main/Main"
import Sidebar from "./Sidebar/Sidebar"
import styled from "styled-components"
import { useThemeContext } from "../context/themeContext"
import panelMenu from "../utils/panelMenu"
import Link from "next/link"
import Router, { useRouter } from 'next/router';
import { signout } from "../actions/auth"
import ModalFull from "./ModalFull/ModalFull"
import Admin from '../Components/auth/Admin'


function Layout({children}) {
    const { showTopPanel, hideTopPanel,modal } =  useUserContext()
    const theme = useThemeContext()

    const router = useRouter();

    const handleClick = (link) => {
        router.push(link);
        //hide top panel
        hideTopPanel()
    }

    return (
        <LayoutStyled theme={theme} showTopPanel={showTopPanel}>
            <Header />
            <Admin>
                {modal && <ModalFull />}
            </Admin>
            <div className="menu-panel">
                {
                    panelMenu.map(item => {
                        const link = item.url
                        return <li className={`nav-item ${router.pathname === link ? 'active' : ''}`} key={item.id} 
                        onClick={() => {
                            handleClick(link)
                            if(link === '/signout') {
                                signout(() =>{
                                    Router.replace('/')
                                })
                            }
                        }}>
                            {item.icon}
                            <Link href={''}>{item.name}</Link>
                        </li>
                    })
                }
            </div>
            <Sidebar />
            {children}
        </LayoutStyled>
    )
}

const LayoutStyled = styled.div`
    .menu-panel{
        display: ${props => props.showTopPanel ? 'block' : 'none'};
        position: fixed;
        right: 1.5rem;
        background-color: ${props => props.theme.colorBg};
        top: 4.4rem;
        z-index: 5;
        width: 270px;
        border-radius: ${props => props.theme.borderRadiusSm};
        box-shadow: ${props => props.theme.shadow6};
        border: 1px solid ${props => props.theme.colorIcons3};
        .nav-item{
            padding: ${props => props.collapsed ? '.6rem 2rem' : '.79rem 2rem'};
            margin: .3rem 0;
            display: grid;
            grid-template-columns: 40px 1fr;
            cursor: pointer;
            position: relative;
            &::after{
                position: absolute;
                transition: all .4s ease-in-out;
                content: '';
                left: 0;
                top: 0;
                width: 0;
                height: 100%;
                background-color: ${props => props.theme.activeNavLinkHover};
                z-index: -1;
            }
            &:hover{
                &::after{
                    width: 100%;
                }
            }
            i{
                display: flex;
                align-items: center;
                color: ${props => props.theme.colorIcons};
            }
            a{
                transition: all .5s ease-in-out;
            }
        }
    }
`;

export default Layout