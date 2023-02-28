import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useState, useTransition } from 'react'
import styled from 'styled-components'
import { useUserContext } from '../../context/context';
import { useThemeContext } from '../../context/themeContext';
import { add } from '../../utils/Icons';
import Button from '../Button/Button';
import Tags from '../Tags/Tags'
import dynamic from 'next/dynamic'
import {withRouter} from 'next/router'
import { getCookie, isAuth } from '../../actions/auth';
import { getTags } from '../../actions/tags';
import { useSnippetContext } from '../../context/snippetContext';
import { useTagContext } from '../../context/tagsContext';
import { snippetCreate } from '../../actions/snippet';
import Select from 'react-select'
import cLang from '../../assets/logos/c.svg'
import python from '../../assets/logos/python.svg'
import cpp from '../../assets/logos/cpp.svg'
import csharp from '../../assets/logos/csharp.svg'
import css from '../../assets/logos/css.svg'
import go from '../../assets/logos/go-old.svg'
import html from '../../assets/logos/html.svg'
import haskell from '../../assets/logos/haskell.svg'
import java from '../../assets/logos/java.svg'
import javascript from '../../assets/logos/javascript.svg'
import kotlin from '../../assets/logos/kotlin.svg'
import php from '../../assets/logos/php.svg'
import lua from '../../assets/logos/lua.svg'
import ruby from '../../assets/logos/ruby.svg'
import r from '../../assets/logos/r.svg'
import swift from '../../assets/logos/swift.svg'
import typescript from '../../assets/logos/typescript.svg'



function ModalFull({router}) {
    const theme = useThemeContext()
    const {hideModal} = useUserContext()
    const {values} = useTagContext()

    const { tags } = values;

    const { snippetValues, setSnippetValues, listSnippets, listAllSnippetsAdmin } = useSnippetContext()
    
    const { title, code,loading, error } = snippetValues;
    const token = getCookie('token')

    //console.log('snippetValues Dtatata', snippetValues);

    //state 
    const [checkedTag, setCheckedTag] = useState([]);
    const [icon, setIcon] = useState(null);


    const languages = [
        { value: 'javascript', icon: javascript, label: 'Javascript' },
        { value: 'css', icon: css, label: 'CSS' },
        { value: 'html', icon: html, label: 'HTML' },
        { value: 'python', icon: python, label: 'Python' },
        { value: 'java', icon: java, label: 'Java' },
        { value: 'c', icon: cLang, label: 'C' },
        { value: 'c++', icon: cpp, label: 'C++' },
        { value: 'c#', icon: csharp , label: 'C#'},
        { value: 'php', icon: php, label: 'PHP' },
        { value: 'ruby', icon: ruby, label: 'Ruby' },
        { value: 'lua', icon: lua, label: 'Lua' },
        { value: 'haskell', icon: haskell, label: 'Haskell' },
        { value: 'go', icon: go, label: 'Go' },
        { value: 'swift', swift: swift, label: 'Swift' },
        { value: 'kotlin', kotlin: kotlin, label: 'Kotlin' },
        { value: 'sql', icon: cLang, label: 'SQL' },
        { value: 'typescript', icon: typescript, label: 'Typescript' },
        { value: 'react', icon: cLang, label: 'React' },
        { value: 'vue', icon: cLang, label: 'Vue' },
        { value: 'angular', icon: cLang, label: 'Angular' },
        { value: 'r', icon: r, label: 'R' },
    ]

    const [codeLanguage, setCodeLanguage] = useState(languages[0].value);


    useEffect(() => {
        console.log('codeLanguage', codeLanguage);
        console.log('icon', icon);
    }, [codeLanguage]);

    const changeCodeLanguage = (e) => {
        setCodeLanguage(e.value) 
        setIcon(e.icon)
    }

    //create Snippet 
    const createSnippet = (e) => {
        e.preventDefault()

        const snippet = {
            title,
            code,
            tags: checkedTag,
            language: codeLanguage,
            icon: icon.src
        }

        //validate form

        snippetCreate(snippet, token).then(data => {
            console.log('create data', data)
            if (data.error) {
                setSnippetValues({ ...snippetValues, error: data.error, loading: false })
            } else {
                setSnippetValues({
                    ...snippetValues,
                    title: '',
                    code: '',
                    language: '',
                    loading: false,
                    error: '',
                    success: true,
                })
                setCheckedTag([]);
                hideModal()
                listAllSnippetsAdmin()
            }
            //refresh snippets if all valiations are passed
            if(!data.error){
                listSnippets()
            }
        })
    }

    //create snippet for auth user

    const handleSnippetChange = name => (e) => {
        setSnippetValues({
            ...snippetValues, 
            [name]: e.target.value, errors: '', 
            loading: false 
        })
    }

    const titleSnippetChange = name => (e) => {
        setSnippetValues({
            ...snippetValues, 
            [name]: e.target.value, errors: '', 
            loading: false 
        })
    }

    //handle tag toggle
    const handleTagToggle = (tag) => () => {
        // add or remove tag from array
        const clickedTag = checkedTag.indexOf(tag);
        const newCheckedTag = [...checkedTag];
        if (clickedTag === -1) {
            //the maximum number of tags is 7
            if (newCheckedTag.length < 7) {
                newCheckedTag.push(tag)
            }
        } else {
            newCheckedTag.splice(clickedTag, 1);
        }
        //return a new array
        setCheckedTag(newCheckedTag);
    }

    //Custom Select styles
    const customStyles = {
        menuList: (base) => ({
            ...base,
            "::-webkit-scrollbar": {
                width: "4px",
            },
            "::-webkit-scrollbar-track": {
                background: '#282c34'
            },
            "::-webkit-scrollbar-thumb": {
                background: 'linear-gradient(110.42deg, #CF57A3 29.2%, #4731B6 63.56%)',
                borderRadius: '10px'
            },
            "::-webkit-scrollbar-thumb:hover": {
                background: "#555"
            }
        }),
        option: (provided, state) => ({
            //color: state.isSelected ? theme.colorGrey6 : theme.colorGrey5,
            padding: '10px 20px',
            backgroundColor: theme.colorBg,
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            //color: color,
            '&:hover': {
                backgroundColor: theme.colorIcons,
            }

        }),

        control: () => ({
            width: '100%',
            backgroundColor: theme.colorBg3,
            height: '100%',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            border: 'none',
            outline: 'none',
            padding: '.4rem',
            cursor: 'pointer'
        }),
        placeholder: (provided) => ({
            ...provided,
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            //position: position,
        }),
        menu: (provided) => ({
            ...provided,
            background: theme.colorBg,
            width: '220px',
            borderRadius: '12px',
            "::-webkit-scrollbar": {
                width: "4px",
                height: "0px",
            },
            "::-webkit-scrollbar-track": {
                background: "#f1f1f1"
            },
            "::-webkit-scrollbar-thumb": {
                background: "#888"
            },
            "::-webkit-scrollbar-thumb:hover": {
                background: "#555"
            }

        }),


        singleValue: (provided, state) => {

            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';
            const color = theme.headerTextColor;

            return { ...provided, opacity, transition, color };
        }
    }

    return (
        <ModalFullStyled theme={theme} className={'snippet-form'}>
            <div className="modal-content">
                <form action="" id="submitBtn">
                    <Select className='react-select-container' options={languages} onChange={changeCodeLanguage} styles={customStyles} placeholder={'Select A Language'} />
                    <div className="input-control">
                        {
                            error && <div className="errors">
                                <h4>Error</h4>
                                <li>
                                    <p>{error}</p>
                                </li>
                            </div>
                        }
                        <input 
                            type="text" 
                            id="title" 
                            placeholder='Title...' 
                            onChange={handleSnippetChange('title')}
                            value={title}
                        />
                    </div>
                    <div className="input-control">
                        <div className="code-body">
                            <pre>
                                <code>
                                    <textarea 
                                        name="" 
                                        id="" 
                                        cols="30" 
                                        rows="10" 
                                        placeholder='Add Your Code Here...'
                                        onChange={handleSnippetChange('code')}
                                        value={code}
                                    >

                                        </textarea>
                                </code>
                            </pre>
                        </div>
                    </div>
                </form>
                <h4>Tags</h4>
                <div className="tags">
                    {
                        tags.map((tag, index) => {
                            return <Button
                                name={tag.name}
                                type={'button'}
                                selector={'btn-login'}
                                padding={'.5rem 2rem'}
                                borderRad={'2rem'}
                                //fs={'1.2rem'}
                                key={tag._id}
                                backgound={
                                    //change color of tag if it is checked
                                    checkedTag.includes(tag._id) ? theme.colorGradient : theme.buttonGradient5
                                }
                                blob={'blob'}
                                border={`1px solid ${theme.colorIcons}`}
                                click={handleTagToggle(tag._id)}
                            />
                        })
                    }
                </div>
                <div className="create-snippet">
                    <Button
                        name={'Create Snippet'}
                        type={'submit'}
                        selector={'btn-login'}
                        padding={'.9rem 1.2rem'}
                        borderRad={'0.5rem'}
                        fs={'1.2rem'}
                        backgound={theme.colorButton}
                        icon={add}
                        blob={'blob'}
                        form="submitBtn"
                        click={createSnippet}
                    />
                </div>
            </div>
            <div className="modal-hider" onClick={hideModal}>
            </div>
        </ModalFullStyled>
    )
}
const ModalFullStyled = styled.div`
    width: 100%;
    height: 100vh;
    z-index: 10;
    position: fixed;
    top: 0;
    .modal-hider{
        width: 100%;
        height: 100%;
        background-color: ${props => props.theme.colorIcons4};
        position: absolute;
        top: 0;
        backdrop-filter: blur(3px);
    }
    .modal-content{
        position: absolute;
        width: 60%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${props => props.theme.colorBg2};
        padding: 2rem;
        border-radius: ${props => props.theme.borderRadiusSm};
        box-shadow: ${props => props.theme.shadow3};
        z-index: 15;
        .input-control{
            margin: 1.5rem 0;
            input, textarea{
                width: 100%;
                border: 1px solid ${props => props.theme.colorIcons};
                border-radius: ${props => props.theme.borderRadiusSm};
                padding: .7rem 1.2rem;
                color: ${props => props.theme.colorGrey0};
                resize: none;
            }
        }
    }

    .create-snippet{
        display: flex;
        justify-content: flex-end;
    }
    .tags{
        display: flex;
        flex-wrap: wrap;
        button{
            margin-bottom: .4rem;
            margin-top: .4rem;
            &:not(:last-child){
                margin-right: .4rem;
            }
        }
    }
`;

export default withRouter(ModalFull)