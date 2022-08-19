import React, { useContext, useEffect, useReducer, useState } from "react";
import { listSnippetsandTags } from '../actions/snippet'
import reducer from '../reducers/snippet_reducer'
import { GET_SNIPPETS_SUCCESS, GET_SNIPPETS_ERROR, GET_SNIPPETS_BEGIN } from "../utils/actions";

const SnippeContext = React.createContext();

export const SnipetProvider = ({ children }) => {

    const [snippetValues, setSnippetValues] = useState({
        title: "",
        code: "",
        tags: [],
        errors: '',
        success: false,
        loading: false,

    });

    const defaultState = {
        snippets: [],
        loading: false,
        tags: [],
    }

    const [state, dispatch] = useReducer(reducer, defaultState) 

    //list all snippets
    const listSnippets =  () => {
        dispatch({ type: GET_SNIPPETS_BEGIN })
        listSnippetsandTags()
            .then(data => {
                dispatch({
                    type: GET_SNIPPETS_SUCCESS, payload: data.snippets
                })
            })
            .catch(err => {
                dispatch({
                    type: GET_SNIPPETS_ERROR, payload: err
                })
            }
        )
    }

    useEffect(() => {
        listSnippets()
    } , [])

    return (
        <SnippeContext.Provider value={{...snippetValues,...state, snippetValues, setSnippetValues}}>
            {children}
        </SnippeContext.Provider>
    )
}

export const useSnippetContext = () => {
    return useContext(SnippeContext);
}
