import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useThemeContext } from '../../context/themeContext';
import { useSnippetContext } from '../../context/snippetContext';
import categories from '../../utils/categories';
import { getUnique } from '../../utils/helper';
import Button from '../Button/Button';

function Categories() {
    const theme  = useThemeContext()
    const [activeCategory, setActiveCategory] = useState(0);
    const [tagName, setTagName] = useState('')
    const { snippets } = useSnippetContext();

    //get unique categories
    const categs = getUnique(categories, 'categories');

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    }

    //filter snippets by the category
    useEffect(() => {
        //filter snippets by tag name
        
    }, [activeCategory])

    //get category name on click
    useEffect(() => {
        setTagName(categs[activeCategory])
    }, [activeCategory])

    console.log('tagName', tagName);

    console.log()
    return (
        <CategoriesStyled theme={theme}>
            {
                categs.map((cat, index) => {
                    return <Button 
                        key={index} 
                        name={cat} 
                        selector={`category ${activeCategory === index ? 'active': null}`}
                        padding={'.4rem 1rem'} 
                        blob={'blob'}
                        border={`1px solid ${theme.colorIcons}`}
                        click={() => handleCategoryClick(index)}
                    />
                })
            }
        </CategoriesStyled>
    )
}

const CategoriesStyled = styled.div`
    display: flex;
    padding: 1.13rem 1.5rem;
    border-bottom: 1px solid ${props => props.theme.borderColor2};
    position: fixed;
    width: 100%;
    background-color: ${props => props.theme.colorBg3};
    .category{
        background-color: ${props => props.theme.colorButton};
        border-radius: 20px;
        color: ${props => props.theme.colorTextLight};
        font-weight: 500;
        font-size: ${props => props.theme.fontSmall2};
        &:not(:last-child){
            margin-right: .9rem;
        }
    }
    .active{
        background-color: ${props => props.theme.colorTextLight};
        color: ${props => props.theme.colorGrey5};
    }
`;

export default Categories