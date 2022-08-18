import React, { useContext, useReducer, useState } from "react"
import user_reducer from "../reducers/user_reducer"
import{ COLLAPSE_SIDEBAR, HIDE_MENU_PANEL, HIDE_MODAL, SHOW_MENU_PANEL, SHOW_MODAL, UPDATE_INPUTS } from "../utils/actions"

const UserContext = React.createContext()
const UserUpdateContext = React.createContext()

export const UserProvider = ({children}) => {

    const initialState = {
        collapsed: true,
        showTopPanel: false,
        hideTopPanel: false,
        modal: true,
    }
    const [state, dispatch] = useReducer(user_reducer, initialState)
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
        loading: false,
        message: '',
        showForm: true,
    })

    const collapseNavbar = () => {
        dispatch({
            type: COLLAPSE_SIDEBAR
        })
    }

    const showMenuPanel = () => {
        dispatch({
            type: SHOW_MENU_PANEL
        })
    }
    const hideTopPanel = () => {
        dispatch({
            type: HIDE_MENU_PANEL
        })
    }

    const showModal = () => {
        dispatch({
            type: SHOW_MODAL
        })
    }

    const hideModal = () => {
        dispatch({
            type: HIDE_MODAL
        })
    }

    const angryEmojies = [
        //10 eomjies
        '😡', '😠', '😞', '😟', '😤', '😥', '😦', '😧', '😨', '😩',
    ]

    //randomize emojie
    const randomEmojie = () => {
        const randomIndex = Math.floor(Math.random() * angryEmojies.length)
        return angryEmojies[randomIndex]
    }

    return(
        <UserContext.Provider value={{ ...state, collapseNavbar, showMenuPanel, hideTopPanel, randomEmojie, showModal, hideModal }}>
            <UserUpdateContext.Provider value={{setValues, values}}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    )
}

export const useUserContext = () =>{
    return useContext(UserContext)
}
export const useUserUpdateContext = () =>{
    return useContext(UserUpdateContext)
}