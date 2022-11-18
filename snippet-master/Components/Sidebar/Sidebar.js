import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useThemeContext } from '../../context/themeContext';
import { useUserContext } from '../../context/context';
import menu from '../../utils/menu'
import bottomMenu from '../../utils/bottomMenu';
import Link from 'next/link'
import { useRouter } from 'next/router';
import {gsap} from 'gsap'


function Sidebar() {
    const theme = useThemeContext()
    const { collapsed, hideTopPanel } = useUserContext()

    const router = useRouter();
    //local state
    const [stopRender, setStopRender] = useState(false)

    //refs
    const sidebar = useRef()
    const nav = useRef()

    const handleClick = (link) => {
        router.push(link); 
        //hide top panel
        hideTopPanel()
    }

    //sidebar animation
    /*
    useEffect(() => {
        const tl = gsap.timeline()
        tl.fromTo(sidebar.current, {x: '-100%'}, {x: '0%', duration: .7}),
        tl.fromTo(nav.current, {opacity: 0, scaleY: 0}, {opacity: 1, duration: .7,scaleY: 1})
        //stop rerendering
        return () => {
            tl.kill()
        }
    },[sidebar])*/

    return (
        <SidebarStyled theme={theme} ref={sidebar} collapsed={collapsed}>
            <nav className="navigation" ref={nav}>
                <div className="top-nav">
                    <ul className="nav-items">
                        {
                            menu.map((item) =>{
                                const link = item.url
                                return <li className={`nav-item ${router.pathname === link ? 'active': ''}`} key={item.id} onClick={() => handleClick(link)}>
                                    {item.icon}
                                    <Link href={item.url}>{item.name}</Link>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <div className="bottom-nav">
                    <ul className="nav-items">
                        {
                            bottomMenu.map((item) => {
                                const link = item.url
                                return <li className={`nav-item ${router.pathname === link ? 'active' : ''}`} key={item.id} onClick={() => handleClick(link)}>
                                    {item.icon}
                                    <Link href={item.url}>{item.name}</Link>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </nav>
            <footer>
                <div className="links">
                    <Link href={'/help'}>Terms</Link>
                    <Link href={'/help'}>Privacy</Link>
                    <Link href={'/help'}>Help</Link>
                </div>
                <p>&copy;Copyright 2022 <Link href={'/'}>SnippetMaster</Link></p>
            </footer>
        </SidebarStyled>
    )
}

const SidebarStyled = styled.div`
    width: ${props => props.collapsed ? props.theme.sidebarWidth : props.theme.sidebarCollapsed};
    height: calc(100vh - 8vh);
    position: fixed;
    background-color: ${props => props.theme.colorBg2};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .active{
        background-color: ${props => props.theme.activeNavLink};
        i{
            color: ${props => props.theme.colorIcons2} !important;
        }
        a{
            color: ${props => props.theme.colorIcons2} !important;
        }
    }
    .navigation{
        margin: 1rem 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        .nav-items{
            .nav-item{
                padding: ${props => props.collapsed ? '.6rem 2rem' : '.79rem 2rem'};
                margin: .3rem 0;
                display: grid;
                grid-template-columns: 40px 1fr;
                cursor: pointer;
                position: relative;
                &::after{
                    position: absolute;
                    transition: all .3s ease-in-out;
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
                    display: ${props => props.collapsed ? 'initial' : 'none'};
                    transition: all .3s ease-in-out;
                }
            }
        }
    }

    footer{
        padding: 1rem 2rem;
        border-top: 1px solid ${props => props.theme.borderColor};
        display: ${props => props.collapsed ? 'initial' : 'none'};
        .links{
            display: flex;
            align-items: center;
            justify-content: center;
            a{
                font-size: ${props => props.theme.fontSmall};
                margin:0 .5rem;
            }
        }
        p{
            font-size: ${props => props.theme.fontSmall};
            text-align: center;
            margin: .5rem 0;
            a{
                background: ${props => props.theme.colorPrimaryGreenGrad};
                color: transparent;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                transition: all .3s ease-in-out;
                font-weight: 600;
                font-size: 15px;
            }
        }
    }
`;
export default Sidebar