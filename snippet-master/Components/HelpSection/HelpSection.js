import React from 'react'
import Layout from '../Layout'
import MainContent from '../MainContent/MainContent'
import styled from 'styled-components'
import helpTabs from '../../utils/helpTabs'
import Link from 'next/link'
import Router from 'next/router'
import HelpFaq from '../HelpFaq/HelpFaq'
import { useThemeContext } from '../../context/themeContext'

function HelpSection() {

    const theme = useThemeContext();

    //active tab
    const [activeTab, setActiveTab] = React.useState(0)

    const HelpTabs = () => {
        switch (activeTab) {
            case 0:
                return <HelpFaq />
            case 1:
                return <p>Licensing and Agreements - Goes Here....</p>
            case 2:
                return <p>Terms of Service - Goes Here....</p>
            case 3:
                return <p>Privacy Policy - Goes Here....</p>
        }
        
    }

    return (
        <Layout>
            <MainContent>
                <HelpSectionStyled theme={theme}>
                    <div className="usefull-information">
                        <div className="help-title">
                            <h2>Useful Information</h2>
                            <p>
                                Do you have any questions? We have answers.
                            </p>
                        </div>
                    </div>
                    <div className="help-container">
                        <div className="left-help">
                            {
                                helpTabs.map((tab, index) => {
                                    return (
                                        <div className="help-tab" key={index}>
                                            <button onClick={() =>{
                                                setActiveTab(index)
                                                Router.push(tab.link)
                                            }}
                                            className={`${activeTab === index ? 'active-button' : ''}`}
                                            >
                                                {tab.title}
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="right-help">
                            {
                                HelpTabs()
                            }
                        </div>
                    </div>
                </HelpSectionStyled>
            </MainContent>
        </Layout>
    )
}

const HelpSectionStyled = styled.div`
    .usefull-information{
        text-align: center;
        padding: 3rem 0;
        .help-title{
            margin-top: 1.5rem;
            p{
                margin-top: .7rem;
                color: ${props => props.theme.colorGrey2};
            }
        }
    }
    .help-container {
        display: grid;
        grid-template-columns: 1fr 3fr;
        padding: 2rem 3rem;
        width: 100%;
        max-width: 90%;
        margin: 0 auto;
        min-height: 70vh;
        border-radius: 50px;
        p{
            color: ${props => props.theme.colorGrey2};
        }
        .left-help{
            background-color: ${props => props.theme.colorBg};
            padding: 2rem 3rem;
            border-top-left-radius: ${props => props.theme.borderRadiusSm};
            border-bottom-left-radius: ${props => props.theme.borderRadiusSm};
            .help-tab{
                margin-bottom: 2rem;
                button{
                    color: ${props => props.theme.colorGrey2};
                    padding-left: 2rem;
                    position: relative;
                    transition: all .4s ease-in-out;
                    text-align: left;
                    &::after{
                        content: '';
                        position: absolute;
                        width: 6px;
                        height: 6px;
                        background-color: ${props => props.theme.colorPrimaryGreen};
                        border-radius: 50%;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%) scale(0);
                    }
                    &:hover{
                        color: ${props => props.theme.colorWhite};
                    }
                }
                .active-button{
                    color: ${props => props.theme.colorWhite};
                    &::after{
                        transform: scale(1) translateY(-50%);
                    }
                }
            }
        }
        .right-help{
            background-color:   ${props => props.theme.colorBg2};
            padding: 2rem 3rem;
            border-top-right-radius: ${props => props.theme.borderRadiusSm};
            border-bottom-right-radius: ${props => props.theme.borderRadiusSm};
        }
    }
`;

export default HelpSection