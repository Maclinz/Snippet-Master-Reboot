import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter';
import avatar1 from '../../assets/avatar1.png'
import Image from 'next/image';
import { useThemeContext } from '../../context/themeContext';
import Button from '../Button/Button';

function Snippet({ snippet }) {
    const theme = useThemeContext();
    
    const {code, title, tags, postedBy} = snippet;

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
    console.log(randomTagColor);

    return (
        <SnippetStyled theme={theme}>
            <div className="snippet-con">
                <div className="snippet-top">
                    <div className="profile">
                        <Image src={avatar1} alt="avatar" width="64" height="64" className='profile-img' />
                        <div className="user-text">
                            <h3 className="s-title2">{postedBy.username}</h3>
                            <p className="s-title">Programmer</p>
                        </div>
                    </div>
                    <h3 className="s-title3">{title}</h3>
                    {/*<div className="language">
                        <p>Javascript</p>
                    </div>*/}
                </div>
                <div className="snippet-mid">
                    <SyntaxHighlighter language='javascript' style={atomOneDark} showLineNumbers={'True'}>
                        {codeString}
                    </SyntaxHighlighter>
                </div>
                <div className="snippet-bottom">
                    <div className="snippet-actions">
                        
                    </div>
                    <div className="snippet-tags">
                        <h3>Tags</h3>
                        <div className="tags">
                            {
                                tags.map(tag => {
                                    return <Button
                                        name={tag.name}
                                        backgound={randomTagColor}
                                        blob={'blob'}
                                        padding={'.4rem 1rem'}
                                        borderRad={'12px'}
                                        key={tag._id}
                                    />
                                })
                            }
                            
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
                code{
                    font-weight: 500;
                }
            }
        }
        .snippet-bottom{
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

export default Snippet