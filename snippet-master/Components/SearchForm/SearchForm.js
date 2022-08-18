import React from 'react'
import styled from 'styled-components'
import { useThemeContext } from '../../context/themeContext';
import { search } from '../../utils/Icons';

function SearchForm() {
    const theme = useThemeContext()
    return (
        <SearchFormStyled theme={theme}>
            <div className="input-control">
                <input type="text" placeholder='Seach Here...' />
                <button className="search">
                    {search}
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
            transition: all .3s ease-in-out;
            color: ${props => props.theme.colorWhite};
            border: 1px solid ${props => props.theme.colorIcons3};
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