import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../context/context'
import { useThemeContext } from '../../context/themeContext'
import styled from 'styled-components';
import { useTagContext } from '../../context/tagsContext';
import Button from '../../Components/Button/Button';
import { add } from '../../utils/Icons';

function Tags() {

    const user = useUserContext()
    const theme = useThemeContext()
    const {values, handleChange, handleSubmit, deleteTag, showError } =  useTagContext()

    const { name, error, success, loading, tags, removed } = values


    const newCategoryForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group" >
                    <input type="text" name='name' placeholder='Add Tags...' className="form-control" value={name} onChange={handleChange} autoFocus />
                </div>
                <div>
                    <Button
                        name={'Create Tag'}
                        type={'submit'}
                        selector={'btn-login'}
                        padding={'.7rem 1.2rem'}
                        borderRad={'0.5rem'}
                        fs={'1.2rem'}
                        backgound={theme.colorButton}
                        icon={add}
                        blob={'blob'}
                    />
                </div>
            </form>
        )
    }

    const showCategories = () => {
        return tags.map((tag, index) => {
            return (
                <Button
                    name={tag.name}
                    type={'button'}
                    selector={'btn-login'}
                    padding={'.5rem 2rem'}
                    borderRad={'2rem'}
                    fs={'1.2rem'}
                    key={tag._id}
                    backgound={theme.buttonGradient8}
                    blob={'blob'}
                    dClick={() => { deleteTag(tag.slug) }}
                />
            )
        })
    }

    return (
        <CategoryStyled theme={theme}>
            <div className="categ-form">
                {
                    newCategoryForm()
                }
            </div>
            <div className="categories">
                {
                    !loading && showCategories()
                }
            </div>
            {
                showError()
            }
        </CategoryStyled>
    )
}

const CategoryStyled = styled.div`
    .categories{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        button{
            font-size: ${props => props.theme.fontSmall2} !important;
            &:not(:last-child){
                margin-right: .5rem;
            }
            margin-bottom: .5rem;
        }
    }
    .categ-form{
        form{
            display: flex;
            .form-group{
                position: relative;
                margin-bottom: 1rem;
                width: 30%;
                input{
                    width: 100%;
                    border: none;
                    padding: .7rem 1.2rem;
                    border-radius: ${props => props.theme.borderRadiusSm};
                    color: ${props => props.theme.colorGrey2};
                    border: 1px solid ${props => props.theme.colorIcons};
                }
            }
            button{
                margin-left: 1rem;
                color: ${props => props.theme.colorGrey0};
                i{
                    color: ${props => props.theme.colorGrey0};
                }
                &:hover{
                    color: ${props => props.theme.colorIcons2};
                    i{
                        color: ${props => props.theme.colorIcons2};
                    }
                }
            }
        }
    }
`;

export default Tags