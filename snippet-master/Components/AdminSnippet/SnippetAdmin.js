import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import {
    atomOneDark,
    docco,
    dark,
    darcula,
    vs,
    idea,
    xcode,
    vs2015,
    obsidian,
    lightfair,
    tomorrow,
    tomorrowNight,
    tomorrowNightBlue,
    tomorrowNightBright,
    tomorrowNightEighties,
    twilight,
    vibrantInk,
    vibrantInkDark,
    vibrantInkLight,
    github,
} from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter';
import avatar1 from '../../assets/avatar1.png'
import Image from 'next/image';
import { useThemeContext } from '../../context/themeContext';
import Button from '../Button/Button';
import Select from 'react-select'
import { edit, heart, trash } from '../../utils/Icons';
import { useSnippetContext } from '../../context/snippetContext';
import Link from 'next/link';


function SnippetAdmin({ snippet }) {
    const theme = useThemeContext();
    const { deleteSnippet } = useSnippetContext()

    const { code, title, postedBy } = snippet;

    const codeString = `${code}`;

    //tag colors 
    const tagColors = [
        theme.buttonGradient1,
        theme.buttonGradient2,
        theme.buttonGradient3,
        theme.buttonGradient4,
        theme.buttonGradient5,
        theme.buttonGradient6,
        theme.buttonGradient7,
        theme.buttonGradient8,
        theme.buttonGradient9,
        theme.buttonGradient10,
        theme.buttonGradient11,
        theme.buttonGradient12,
        theme.buttonGradient13,
        theme.buttonGradient14,
    ]

    //randomanize tag colors
    const randomTagColor = tagColors[Math.floor(Math.random() * tagColors.length)];

    //randomize with useMemo
    const randomTagColorMemo = useMemo(() => {
        return randomTagColor;
    }, []);


    return (
        <SnippetStyled theme={theme}>
            <div className="snippet-con">
                <div className="snippet-top">
                    <div className="profile">
                        <Image src={avatar1} alt="avatar" width="64" height="64" className='profile-img' />
                        <div className="user-text">
                            <h3 className="s-title2">
                                {
                                    <Link href={`/profile/${!postedBy.username ? '' : postedBy.username}`}>
                                        {postedBy.username}
                                    </Link>
                                }
                            </h3>
                            <p className="s-title">Programmer</p>
                        </div>
                    </div>
                    <h3 className="s-title3">{title}</h3>
                    {/*<div className="language">
                        <p>Javascript</p>
                    </div>*/}
                </div>
                <div className="snippet-mid">
                    <SyntaxHighlighter language='javascript' style={atomOneDark} showLineNumbers={'True'} wrapLongLines={'True'}>
                        {codeString}
                    </SyntaxHighlighter>
                </div>
                <div className="snippet-bottom">
                    <div className="snippet-actions">
                        <div className="left-actions">
                            <Button
                                name={'2.5K Likes'}
                                backgound={randomTagColorMemo}
                                blob={'blob'}
                                padding={'.6rem 1rem'}
                                borderRad={'12px'}
                                icon={heart}
                            />
                        </div>
                        <div className="right-actions">
                            <Button
                                name={'Edit'}
                                backgound={randomTagColorMemo}
                                blob={'blob'}
                                padding={'.6rem 1rem'}
                                borderRad={'12px'}
                                icon={edit}
                            />
                            <Button
                                name={'Delete'}
                                backgound={randomTagColorMemo}
                                blob={'blob'}
                                padding={'.6rem 1rem'}
                                borderRad={'12px'}
                                icon={trash}
                                click={() => deleteSnippet(snippet.slug)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </SnippetStyled>
    )
}

const SnippetStyled = styled.div`
    width: 100%;
    background-color: ${props => props.theme.colorBg2};
    border-radius: ${props => props.theme.borderRadiusSm};
    position: relative;
    z-index: 1;
    .snippet-con{
        padding: 2rem;
        .snippet-top{
            .profile{
                position: relative;
                border-radius: 50% ;
                display:flex ;
                align-items: center;
                .profile-img{
                    border-radius: 50% ;
                    border: 2px solid ${props => props.theme.colorPrimary} !important;
                }
                .user-text{
                    margin-left:1rem ;
                }
            }
            .s-title3{
                margin: 1rem 0;
            }
        }
        .snippet-mid{
            margin-top: .5rem;
            margin-left:0 ;
            margin-right:0 ;
            margin-bottom: 2rem;
            pre{
                border-radius: ${props => props.theme.borderRadiusSm};
                max-height: 350px;
                height: 350px;
                code{
                    font-weight: 500;
                }
            }
        }
        .snippet-bottom{
            .snippet-actions{
                margin: 1rem 0;
                display: flex;
                justify-content: space-between;
                button{
                    border: 1px solid ${props => props.theme.colorIcons};
                    transition: all .4s ease-in-out;
                    &:hover{
                        box-shadow: ${props => props.theme.shadow5};
                        transition: all .4s ease-in-out;
                        color: ${props => props.theme.colorGrey0};
                        i{
                            color: ${props => props.theme.colorGrey0};
                            transition: all .4s ease-in-out;
                        }
                    }
                    i{
                        color: ${props => props.theme.colorIcons2};
                    }
                }
                .right-actions{
                    display: flex;
                    button{
                        margin-left: .7rem;
                    }
                }
            }
            .snippet-tags{
                h3{
                    margin-bottom: .6rem;
                }
                .tags{
                    display: flex;
                    flex-wrap: wrap;
                    button{
                        transition: all .4s ease-in-out;
                        margin-bottom: 1rem;
                        &:not(:last-child){
                            margin-right: .8rem;
                        }
                        border: 1px solid ${props => props.theme.colorIcons};
                        &:hover{
                            box-shadow: ${props => props.theme.shadow5};
                            transition: all .4s ease-in-out;
                        }
                    }
                }
            }
        }
    }
`;

export default SnippetAdmin