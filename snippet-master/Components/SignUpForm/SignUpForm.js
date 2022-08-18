import React, { useEffect, useRef, useState } from 'react'
import { useThemeContext } from '../../context/themeContext';
import styled from 'styled-components';
import Button from '../Button/Button';
import { login } from '../../utils/Icons';
import { useUserContext, useUserUpdateContext } from '../../context/context';
import { isAuth, signup } from '../../actions/auth';
import Router from 'next/router';
import { gsap } from 'gsap';


function SignUpForm() {
    const theme = useThemeContext()   
    const { randomEmojie } = useUserContext()
    const {setValues, values} = useUserUpdateContext()
    const {name, email, password, error, success, loading, message, showForm} = values

    //useref
    const loginForm = useRef()
    const formContent = useRef()

    const handleChange = name => e => {
        let value = e.target.value
        setValues({ ...values, error: false, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setValues({ ...values, error: false, loading: true })
        const user = {name, email, password}
        
        signup(user).then(data => {
            if(data.error){
                //if error, show error in form
                setValues({ ...values, error: data.error, loading: false })
            } else{
                //if no error, show success message
                setValues({ 
                    ...values, 
                    name: '', 
                    email: '', 
                    password: '' , 
                    error: '', 
                    showForm: false, 
                    loading: false, 
                    message: data.message 
                })

                Router.push('/login')
            }
        })
    }


    useEffect(() => {
        //animate form
        /*const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power3' } })
        tl.fromTo(loginForm.current,
            { opacity: 0, y: '-100%', scale: 0.5 },
            { opacity: 1, y: '0%', scale: 1, duration: 1 }
        )
        //Animate form content
        tl.fromTo(formContent.current,
            { opacity: 0, },
            { opacity: 1, duration: .8, delay: -0.3 }
        )*/

        isAuth() && Router.push('/')

        //kill animation on unmount
        /*return () => {
            tl.kill()
        }*/
    }, [])

    return (
        <SignUpFormStyled theme={theme} onSubmit={handleSubmit} ref={loginForm}>
            <div className="form-header">
                <h1>Register {error && randomEmojie()}</h1>
            </div>
            <div className="form-bottom" ref={formContent}>
                {
                    error && <div className="error">
                        <h4>Error:</h4>
                        <li>
                            <p>{error}</p>
                        </li>
                    </div>
                }
                <div className="input-control">
                    <label htmlFor="name">Name<span>*</span></label>
                    <input 
                        type="text" 
                        id="name" 
                        placeholder='John Doe' 
                        value={name}
                        onChange={handleChange('name')}
                    />
                </div>
                <div className="input-control">
                    <label htmlFor="email">Email<span>*</span></label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder='email@example.com' 
                        value={email}
                        onChange={handleChange('email')}
                    />
                </div>
                <div className="input-control">
                    <label htmlFor="password">Password<span>*</span></label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder='***********' 
                        onChange={handleChange('password')}
                        value={password}
                    />
                </div>
                <Button 
                    name={'Register'} 
                    type={'submit'} 
                    selector={'btn-login'}
                    padding={'1.2rem 2.4rem'}
                    borderRad={'0.8rem'}
                    fw={'bold'}
                    fs={'1.2rem'}
                    backgound={theme.colorPrimary2}
                    icon={login}
                    blob={'blob'}
                />
            </div>
        </SignUpFormStyled>
    )
}

const SignUpFormStyled = styled.form`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
    box-shadow: ${props => props.theme.shadow3};
    border-radius: ${props => props.theme.borderRadiusMd2};
    .error{
        color: ${props => props.theme.colorDanger};
        h4{
            font-size: 1.8rem;
        }
        li{
            list-style: circle;
        }
        p{
            font-weight: 500;
            display: inline;
        }
    }
    .form-header{
        padding: 3rem;
        background-color: rgba(255,255,255,0.024);
        border-top-right-radius: ${props => props.theme.borderRadiusMd};
        border-top-left-radius: ${props => props.theme.borderRadiusMd};
        h1{
            text-align: center;
        }
    }
    .form-bottom{
        background-color: #202020;
        padding: 3rem;
        border-bottom-left-radius: ${props => props.theme.borderRadiusMd};
        border-bottom-right-radius: ${props => props.theme.borderRadiusMd};
    }

    .input-control{
        position: relative;
        margin: 2rem 0;
        input{
            width: 100%;
            border: none;
            padding-left: 10rem;
            padding-right: 2rem;
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
            background-color: ${props => props.theme.colorGreyDark};
            border-radius: ${props => props.theme.borderRadiusSm};
            color: ${props => props.theme.colorGrey2};
        }
        label{
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1.2rem;
            font-weight: 700;
            span{
                color: ${props => props.theme.colorGrey3};
            }
        }
    }
`;

export default SignUpForm