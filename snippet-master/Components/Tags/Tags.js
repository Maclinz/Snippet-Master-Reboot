import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../context/context'
import { useThemeContext } from '../../context/themeContext'
import Button from '../Button/Button'
import styled from 'styled-components';
import { useTagContext } from '../../context/tagsContext'

function Tags() {

    const user = useUserContext()
    const theme = useThemeContext()
    const {values, handleChange, handleSubmit, deleteTag, showError } =  useTagContext()

    const { name, error, success, loading, tags, removed } = values


    const newCategoryForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group" >
                    <input type="text" name='name' placeholder='Create Category' className="form-control" value={name} onChange={handleChange} autoFocus />
                </div>
                <div>
                    <button className="btn btn-primary" type="submit">
                        Create
                    </button>
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
                    fw={'bold'}
                    fs={'1.2rem'}
                    key={tag._id}
                    backgound={theme.colorGradient}
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
        button{
            font-size: ${props => props.theme.fontSmall2} !important;
            &:not(:last-child){
                margin-right: .5rem;
            }
        }
    }
    .categ-form{
        form{
            display: flex;
            .form-group{
                position: relative;
                margin-bottom: 1rem;
                input{
                    width: 100%;
                    border: none;
                    padding-left: 1rem;
                    padding-right: 2rem;
                    padding-top: 1.5rem;
                    padding-bottom: 1.5rem;
                    background-color: ${props => props.theme.colorGreyDark};
                    border-radius: ${props => props.theme.borderRadiusSm};
                    color: ${props => props.theme.colorGrey2};
                }
            }
        }
    }
`;

export default Tags