import React, { useState } from 'react'
import styled from 'styled-components'
import { searchSnippets } from '../../actions/snippet';
import { useSnippetContext } from '../../context/snippetContext';
import { useThemeContext } from '../../context/themeContext';
import { search as searchIcon } from '../../utils/Icons';

function SearchForm() {
    const theme = useThemeContext()

    const { handleSearch, handleInputChange, hideTopPanel } = useSnippetContext()

    //searched snippets


    //handle search input
    

    return (
        <SearchFormStyled theme={theme} onSubmit={handleSearch} >
            <div className="input-control">
                <input type="text" placeholder='Seach Here...' onChange={handleInputChange} />
                <button className="search">
                    {searchIcon}
                </button>
            </div>
        </SearchFormStyled>
    )
}

const SearchFormStyled = styled.form`

    .input-control{
        position: relative;
        input{
            background: ${props => props.theme.colorBg2};
            padding: .6rem .7rem;
            border-radius: ${props => props.theme.borderRadiusSm};
            font-family: inherit;
            width: 400px;
            color: ${props => props.theme.colorWhite};
            border: 1px solid ${props => props.theme.colorIcons3};
            transition: all .3s ease-in-out;
            &:active{
                width: 500px;
                border: 1px solid ${props => props.theme.colorIcons};
            }
            &:focus{
                width: 500px;
                border: 1px solid ${props => props.theme.colorIcons};
            }
            &::placeholder{
                font-weight: 500;
            }
        }
        .search{
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
`;

export default SearchForm