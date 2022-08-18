import React from 'react'
import styled from 'styled-components';
import { useUserContext } from '../../context/context';
import { useThemeContext } from '../../context/themeContext';
import Category from '../crud/Category'


function CreateCategories() {
    const theme = useThemeContext()
    return (
        <CreateCategoriesStyled theme={theme}>
            <Category />
        </CreateCategoriesStyled>
    )
}

const CreateCategoriesStyled = styled.div`
    background-color: ${props => props.theme.colorBg2};
    width: 600px;
    border-radius: ${props => props.theme.borderRadiusMd};
    padding: 2rem 1.5rem;
    min-height: 300px;
`;

export default CreateCategories