import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components'
import { getCookie, isAuth } from '../../actions/auth';
import { getProfile, updateUser } from '../../actions/user';
import { useSnippetContext } from '../../context/snippetContext';
import { useThemeContext } from '../../context/themeContext';
import { githubIcon, linked, mailIcon } from '../../utils/Icons';
import Button from '../Button/Button';

function ProfileUpdate() {

    const theme = useThemeContext()
    const {listSnippets, listAllSnippetsAdmin} = useSnippetContext()

    const [values, setValues] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        error: false,
        success: false,
        loading: false,
        photo: '',
        about: '',
        userData: '',
        github: '',
        linkedin: '',
        mail: '',
    });

    const token = getCookie('token');
    const { username, name, email, password,about, github,linkedin, mail, error, success, loading, photo, userData } = values;

    //console.log('My vAlues', values)
    //load user profile data
    const initProfile = () => {
        getProfile(token).then(data => {
            //console.log('Profile Data', data);
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ 
                    ...values, 
                    username: data.username, 
                    name: data.name, 
                    email: data.email, 
                    about: data.about, 
                    github: data.github,
                    linkedin: data.linkedin,
                    mail: data.mail,
                })
            }
        })
    };

    //handle form change 
    const handleChange = name => e => {
        //check if the name is photo then get the file else get the value
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        
        let userFormData = new FormData();
        userFormData.set(name, value);
        setValues({ ...values, [name]: value, userData: userFormData, error: false, success: false })
    }

    //handle form submit
    const handleSubmit = e => {
        e.preventDefault();
        //set loading to true 
        setValues({ ...values, loading: true });

        //update user
        updateUser(token, userData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false })
            } else {
                setValues({ 
                    ...values, 
                    username: data.username, 
                    name: data.name, 
                    email: data.email, 
                    about: data.about, 
                    success: true, 
                    github: data.github,
                    linkedin: data.linkedin,
                    mail: data.mail,
                    loading: false 
                })
            }
            
            if(!data.error){
                listSnippets()
                listAllSnippetsAdmin()
            }
        })
    }

    //get user info
    useEffect(() => {
        //init profile is user is logged in
        if (isAuth()) {
            initProfile();
        }
    }, []);

    //console.log('My vAlues 22222', values)

    //form for user infromation
    const profileUpdateForm = () => {
        return <form className='user-from'>
            <div className="file-uploader">
                <label htmlFor="file-upload" className="file-upload">
                    Photo
                </label>
                <input id="file-upload" 
                    type="file" accept="image/*" 
                    className='img-upload'  
                    onChange={handleChange('photo')}
                    hidden
                />
                <div className="input-controller">
                    <span className="icon">
                        {githubIcon}
                    </span>
                    <input type="text"
                        id='github'
                        name='github'
                        value={github}
                        autoComplete='off'
                        onChange={handleChange('github')}
                    />
                </div>
                <div className="input-controller">
                    <span className="icon">
                        {linked}
                    </span>
                    <input type="text"
                        id='linkedin'
                        name='linkedin'
                        value={linkedin}
                        autoComplete='off'
                        onChange={handleChange('linkedin')}
                    />
                </div>
                <div className="input-controller">
                    <span className="icon">
                        {mailIcon}
                    </span>
                    <input type="text"
                        id='mail'
                        name='mail'
                        value={mail}
                        autoComplete='off'
                        onChange={handleChange('mail')}
                    />
                </div>
                
            </div>
            <div className="names">
                <div className="input-controller">
                    <label htmlFor="username">Username</label>
                    <input type="text"
                        id='username'
                        name='username'
                        value={username}
                        onChange={handleChange('username')}
                    />
                </div>
                <div className="input-controller">
                    <label htmlFor="name">Name</label>
                    <input type="text"
                        id='name'
                        name='name'
                        value={name}
                        onChange={handleChange('name')}
                    />
                </div>
            </div>
            <div className="input-controller">
                <label htmlFor="email">Email</label>
                <input type="email" 
                    id='email'
                    name='email' 
                    value={email} 
                    onChange={handleChange('email')}
                    autoComplete='off'
                />
            </div>
            <div className="input-controller">
                <label htmlFor="password">Password</label>
                <input type="password" 
                    id='password'
                    name='password' 
                    value={password} 
                    onChange={handleChange('password')}
                />
            </div>
            <div className="input-controller">
                <label htmlFor="about">Bio</label>
                <textarea value={about} 
                    id='about'
                    name="about"
                    cols="30" rows="6"
                    maxLength={460}
                    onChange={handleChange('about')}
                    >

                    </textarea>
            </div>
            <div className="submit-container">
                <Button
                    type='submit'
                    click={handleSubmit}
                    name='Save Changes'
                    blob={'blob'}
                    padding={'.8rem 1rem'}
                    borderRad={'12px'}
                    backgound={'#6FCF97'}
                />
            </div>
        </form>
    }

    return (
        <ProfileUpdateStyled theme={theme}>
            <div className="form-con">
                {
                    profileUpdateForm()
                }
            </div>
        </ProfileUpdateStyled>
    )
}

const ProfileUpdateStyled = styled.div`
    position: relative;
    min-height: 92vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .file-uploader{
        margin-bottom: 1.5rem;
        display: flex;
        gap: 1rem;
        .input-controller{
            position: relative;
            .icon{
                position: absolute;
                top: 50%;
                left: 1rem;
                transform: translateY(-50%);
                i{
                    font-size: 1.5rem;
                }
            }
            input{
                padding-left: 3.2rem !important;
            }
        }
        label{
            display: inline-block;
            padding: .8rem 1.2rem;
            border-radius: ${props => props.theme.borderRadiusSm};
            border: 2px solid ${props => props.theme.colorPrimaryGreen};
            cursor: pointer;
            align-self: flex-start;
        };
    }
    .submit-container{
        display: flex;
        justify-content: flex-end;
    }
    .form-con{
        background-color: ${props => props.theme.colorBg2};
        width: 70%;
        border-radius: ${props => props.theme.borderRadiusSm};
        .user-from{
            padding: 2rem 3rem;
            .names{
                display: flex;
                justify-content: space-between;
                gap: 1.5rem;
                @media screen and (max-width: 1143px){
                    flex-direction: column;
                    gap: 0;
                }
            }
            .input-controller{
                margin-bottom: 1.5rem;
                display: flex;
                flex-direction: column;
                width: 100%;
                label{
                    margin-bottom: .5rem;
                    font-weight: 500;
                }
                textarea{
                    resize: none;
                    width: 100%;
                }
                textarea, input{
                    padding: .8rem 1rem;
                    border-radius: ${props => props.theme.borderRadiusSm};
                    border: 1px solid ${props => props.theme.colorIcons};
                    outline: none;
                    color: ${props => props.theme.colorWhite};
                    &:focus{
                        border: 1px solid ${props => props.theme.colorPrimaryGreen};
                    }
                }
            }
        }
    }
`;

export default ProfileUpdate